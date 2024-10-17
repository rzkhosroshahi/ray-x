import fs from 'fs/promises';
import path from 'path';

const __dirname = path.resolve();

function getContentType(extname) {
    const contentTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.ico': 'image/x-icon',
    };
    return contentTypes[extname] || 'application/octet-stream';
}

export async function serveStatic(req, res) {
    if (req.method !== 'GET') return false;

    const requestedFile = req.url === '/' ? '/index.html' : req.url;
    const filePath = path.join(__dirname, requestedFile);

    try {
        const data = await fs.readFile(filePath);
        const ext = path.extname(filePath);
        const contentType = getContentType(ext);

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
        return true;
    } catch (err) {
        return false;
    }
}