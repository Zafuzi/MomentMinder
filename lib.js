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
    const response = await fetch(path, {method: 'GET', headers: {'Content-Type': 'text/html'}})
    
    if(!response.ok)
    {
        throw new Error(`Failed to load ${path}`);
    }
    
    return  await response.text();
}

String.prototype.interpolate = function(params) {
    const names = Object.keys(params);
    const values = Object.values(params) ;
    return new Function(...names, `return \`${this}\`;`)(...values);
}