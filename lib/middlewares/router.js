import fs from 'fs/promises';
import path from 'path';

const __dirname = path.resolve();

export async function serveRoutes(req, res, routes) {
    if (req.method !== 'POST') return false;

    const route = routes.find(route => req.url === route.path);

    if (!route) return false;

    try {
        const content = await fs.readFile(route.html);
        res.writeHead(200, { method: 'POST', 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ content: content.toString() }));
        return true;
    } catch (err) {
        console.log(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return true;
    }
}

export async function serve404(_, res) {
    try {
        const content = await fs.readFile(path.join(__dirname, '404.html'));
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(content);
    } catch (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Page Not Found');
    }
}