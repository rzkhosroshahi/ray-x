function initiateRouter() {
    navigate(window.location.pathname);

    window.history.link = (path) => {
        if (path === window.location.pathname) return;
        navigate(path);
    }

    function navigate(path) {
        fetch(path, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                const root = document.querySelector('#root');
                document.startViewTransition(() => {
                    root.innerHTML = data.content;
                });
                
                window.history.pushState(null, null, path);
            })
            .catch(error => {
                console.error('Error loading page content:', error);
                document.querySelector('#root').innerHTML = 'Error loading content';
            });
    }

    window.addEventListener('popstate', () => {
        navigate(window.location.pathname);
    });
}

initiateRouter();


