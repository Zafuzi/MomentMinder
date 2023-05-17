// start by importing the login page
import {listen} from '/lib.js';
import {preloadRoutes, renderPage} from '/routes.js';

const route = window.location.pathname;
const queryData = new URLSearchParams(window.location.search);
const page = queryData.get('page') || "home";

console.log(`route: ${route}${page}`);

listen("nav a", "click", async (event) => {
    event.preventDefault();
    
    const href = event.target.getAttribute('href');
    const localQueryData = new URLSearchParams(href.split("?")[1]); 
    const localPage = localQueryData.get('page');
    
    console.log(href, localQueryData, localPage);
    
    await renderPage(localPage);
    window.history.pushState({}, localPage, href);
});


(async function()
{
    await preloadRoutes();
    await renderPage(page);
})();