# Extreal.Dev

This is the Unity project to develop Extreal modules.

## Local Development

1. Clone this git repository.
1. Clone the Extreal module you want to develop into the `Packages` directory.
1. Open the Unity Editor and select `Packages/Extreal.*/Runtime/Extreal.*.asmdef`.
1. Add `Extreal.Framework.Analyzer` to Inspector's `Assembly Definition References`(where * corresponds to the module name).

## How to Contribute

- If special procedures are required for testing methods, etc., they are described in the README of each repository. If nothing is written, there are no special procedures.
- The main branch is the latest release, and the develop branch is the latest development.
- Create a branch from the latest development branch and submit a Pull Request.
- Add test code and make all automated tests successful.
- Make sure test coverage is 100%.
- Make sure there are no problems with static analysis.
- We have set up a pull request template so that you can fill it in and let us know the status of your pull request.
- When you have completed your work, request a review from us.
