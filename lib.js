
export function convertToElement(html)
{
    // create a template element
    let template = document.createElement('template');
    // set the template html
    template.innerHTML = html;
    // return the template content
    return template.content;
}

export async function render(ModuleTemplate, root)
{
    if(!root)
    {
        throw new Error("No root element provided");
    }

    root.innerHTML = "";

    if(!ModuleTemplate || typeof ModuleTemplate?.init !== 'function')
    {
        root.innerHTML = "404";
        return;
    }


    const html = await ModuleTemplate?.init();
    // console.log(html);

    // insert TodoItems page into document.body
    root.appendChild(convertToElement(html));
    if(typeof ModuleTemplate?.afterRender === 'function')
    {
        ModuleTemplate?.afterRender();
    }
}

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

export function Nav(moduleName, rootElement)
{
    import(`./components/${moduleName}.js`).then(module => {
        render(module.default, rootElement);
    });
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