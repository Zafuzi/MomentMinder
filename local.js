// start by importing the login page
import {listen, loadModule} from './lib.js';

const route = window.location.pathname;
const queryData = new URLSearchParams(window.location.search);
const page = queryData.get('page') || "home";

console.log(`route: ${route}${page}`);

const routes = {
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

const rootElement = document.getElementById('root');

listen("nav a", "click", async (event) => {
    event.preventDefault();
    
    const href = event.target.getAttribute('href');
    const localQueryData = new URLSearchParams(href.split("?")[1]); 
    const localPage = localQueryData.get('page');
    
    console.log(href, localQueryData, localPage);
    
    await renderPage(localPage);
    window.history.pushState({}, localPage, href);
});

async function renderPage(page)
{
    if(!routes[page])
    {
        rootElement.innerHTML = `<h1>404</h1>`;
        return;
    }
    
    const module = routes[page].module || await loadModule(routes[page].path);
    if(!module)
    {
        rootElement.innerHTML = `<h1>404</h1>`;
        return;
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
async function preloadRoutes()
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

(async function()
{
    await preloadRoutes();
    await renderPage(page);
})();