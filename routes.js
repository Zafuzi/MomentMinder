import {loadModule, rootElement} from "/lib.js";

export const routes = {
    'home': {
        path: '/components/home/home.js',
        preload: true,
        module: null,
    },
    'about': {
        path: '/components/about/about.js',
        preload: false,
        module: null,
    },
    'login': {
        path: '/components/login/login.js',
        preload: true,
        module: null,
    },
}

export async function renderPage(page)
{
    if(!routes[page])
    {
        rootElement.innerHTML = `<h1>404</h1>`;
        return;
    }

    if(routes[page].module)
    {
        console.log(`rendering ${page} from cache`);
    }

    const module = routes[page].module || await loadModule(routes[page].path);
    if(!module)
    {
        rootElement.innerHTML = `<h1>404</h1>`;
        return;
    }

    if(!routes[page].module)
    {
        routes[page].module = module;
    }

    if(typeof module.beforeRender === 'function')
    {
        await module.beforeRender();
    }

    if(typeof module.render === 'function')
    {
        rootElement.innerHTML = await module.render();
    }

    if(typeof module.afterRender === 'function')
    {
        await module.afterRender();
    }
}

// preload all routes
export async function preloadRoutes()
{
    for(const route in routes)
    {
        const routeData = routes[route];
        if(!routeData.preload)
        {
            continue;
        }

        await loadModule(routeData.path).then((module) => {
            routeData.module = module;
        });
    }
}
