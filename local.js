// start by importing the login page
import {loadHtml, loadModule} from './lib.js';

const rootElement = document.getElementById('root');

const modules = [];


(async function()
{
    modules.push(await loadModule('/components/login.js'));
    
    for(const module of modules)
    {
        await module.beforeRender();
        rootElement.innerHTML = await module.render();
        await module.afterRender();
    }
})();