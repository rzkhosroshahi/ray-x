import http from 'http';
import { serveStatic } from './middlewares/static.js';
import { serveRoutes, serve404 } from './middlewares/router.js';

export function createServer(clientRoutes = []) {
    const server = http.createServer(async (req, res) => {
        const servedStatic = await serveStatic(req, res);
        if (servedStatic) return;

        const servedRoute = await serveRoutes(req, res, clientRoutes);
        if (servedRoute) return;

        await serve404(req, res); // ToDo: fix handling 404 page its not working
    });

    return server;
}

export default createServer;
