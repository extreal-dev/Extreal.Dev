import { serveDir } from "https://deno.land/std@0.192.0/http/file_server.ts";
Deno.serve(
    { port: 3333 },
    (req) => {
        const path = new URL(req.url).pathname;
        if (path.startsWith("/assets")) {
            return serveDir(req, { fsRoot: "./Data/" });
        }
        if (path.startsWith("/Panorama")) {
            return serveDir(req, { fsRoot: "./PanoramicData/" });
        }
        return serveDir(req, { fsRoot: "./Dev/" });
    },
);
