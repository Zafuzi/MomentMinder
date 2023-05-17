import {routes} from "/routes.js";

export const rootElement = document.getElementById('root');

export function listen(query, event, callback)
{
    const elements = document.querySelectorAll(query);
    if(elements.length === 0)
    {
        console.warn(`No elements found matching ${query}`);
        return;
    }

    if(elements.length > 0)
    {
        elements.forEach(element => {
            element.removeEventListener(event, callback);
            element.addEventListener(event, callback);
        });
        return;
    }

    // replace existing event listener of the same type with this one to avoid dupes
    elements[0].removeEventListener(event, callback);
    elements[0].addEventListener(event, callback);
}

export async function loadModule(path)
{
    return await import(path);
}

export async function loadHtml(path)
{
    const routeFromPath = routes[path];
    const htmlPath = routeFromPath?.template;
    const html = routeFromPath?.html;
    
    if(!htmlPath === "")
    {
        throw new Error(`No html file specified for ${path}`);
    }
    
    if(!html)
    {
        console.log("fetching html", path);
        const response = await fetch(htmlPath, {method: 'GET', headers: {'Content-Type': 'text/html'}})
        if(!response.ok)
        {
            throw new Error(`Failed to load ${path}`);
        }
        routeFromPath.html = await response.text();
    }
    
    return routeFromPath.html;
}

String.prototype.interpolate = function(params) {
    const names = Object.keys(params);
    const values = Object.values(params) ;
    return new Function(...names, `return \`${this}\`;`)(...values);
}