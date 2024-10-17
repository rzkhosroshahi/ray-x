import app from './lib/ray-x.js';

const PORT = 3000;
const customRoutes = [
    {
        path: '/',
        html: './pages/home/home.html',
    },
    {
        path: '/about',
        html: './pages/about/about.html',
    },
    {
        path: '/contact',
        html: './pages/contact/contact.html'
    }
];

const server = app(customRoutes);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});