(function () {
    'use strict';

    let isDebug;
    let helper;
    const boundMethods = new Map();
    globalThis["__getNop"] = (helperObj) => {
        helper = helperObj;
        return (jsonConfigPtr) => {
            isDebug = JSON.parse(ptrToStr(jsonConfigPtr)).isDebug;
            console.log(`helper: isDebug=${isDebug}`);
        };
    };
    globalThis["__getMethod"] = (name) => {
        const method = boundMethods.get(name);
        if (!method) {
            throw new Error(`bound method not found. name=${name}`);
        }
        return method;
    };
    const bindMethod = (name, method) => {
        boundMethods.set(name, method);
        return;
    };
    const ptrToStr = (ptr) => helper.UTF8ToString(ptr);
    const strToPtr = (str) => {
        const size = helper.lengthBytesUTF8(str) + 1;
        const ptr = helper.Module._malloc(size);
        helper.stringToUTF8(str, ptr, size);
        return ptr;
    };
    const callbackToUnity = (callbackPtr, str1, str2) => {
        const ptr1 = strToPtr(str1);
        const ptr2 = strToPtr(str2);
        helper.Module.dynCall_vii(callbackPtr, ptr1, ptr2);
        helper.Module._free(ptr1);
        helper.Module._free(ptr2);
    };
    const actions = new Map();
    const functions = new Map();
    const callbacks = new Map();
    const UNUSED = "";
    bindMethod("CallAction", (namePtr, strParamPtr1, strParamPtr2) => {
        const name = ptrToStr(namePtr);
        const action = actions.get(name);
        if (!action) {
            throw new Error(`A action to call not found. name=${name}`);
        }
        const strParam1 = strParamPtr1 ? ptrToStr(strParamPtr1) : UNUSED;
        const strParam2 = strParamPtr2 ? ptrToStr(strParamPtr2) : UNUSED;
        if (isDebug) {
            console.log(`call action: name=${name} strParam1=${strParam1} strParam2=${strParam2}`);
        }
        action(strParam1, strParam2);
    });
    bindMethod("CallFunction", (namePtr, strParamPtr1, strParamPtr2) => {
        const name = ptrToStr(namePtr);
        const func = functions.get(name);
        if (!func) {
            throw new Error(`A function to call not found. name=${name}`);
        }
        const strParam1 = strParamPtr1 ? ptrToStr(strParamPtr1) : UNUSED;
        const strParam2 = strParamPtr2 ? ptrToStr(strParamPtr2) : UNUSED;
        if (isDebug) {
            console.log(`call function: name=${name} strParam1=${strParam1} strParam2=${strParam2}`);
        }
        return strToPtr(func(strParam1, strParam2));
    });
    bindMethod("AddCallback", (namePtr, callbackPtr) => {
        const name = ptrToStr(namePtr);
        if (isDebug) {
            console.log(`add callback: name=${name}`);
        }
        callbacks.set(name, (str1, str2) => {
            callbackToUnity(callbackPtr, str1, str2);
        });
    });
    const addAction = (name, action) => actions.set(name, action);
    const addFunction = (name, func) => functions.set(name, func);
    const callback = (name, strParam1, strParam2) => {
        const cb = callbacks.get(name);
        if (!cb) {
            throw new Error(`A callback to call not found. name=${name}`);
        }
        if (isDebug) {
            console.log(`call callback: name=${name} strParam1=${strParam1} strParam2=${strParam2}`);
        }
        cb(strParam1 ?? UNUSED, strParam2 ?? UNUSED);
    };

    addAction("DoAction", (str1, str2) => {
        callback("HandleOnCallback", `param1=[${str1}]`, `param2=[${str2}]`);
    });
    addFunction("DoFunction", (str1, str2) => {
        return `received param1=[${str1}] param2=[${str2}] in function`;
    });

})();
