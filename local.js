// start by importing the login page
import {loadHtml, loadModule} from './lib.js';

const rootElement = document.getElementById('root');

(async function()
{
    const module = await loadModule('/components/login.js');
    await module.init();
    rootElement.innerHTML = await module.render();
    await module.afterRender();
})();