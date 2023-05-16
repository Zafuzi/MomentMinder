import { render } from '../lib.js';
import TodoItems from './TodoItems.js';

export default
{
    templateData: null,
    async init() {
        return (`
            <div>
                <h1>Todo</h1>
                <div id="todoItems"></div>
            </div>
        `);
    },
    afterRender()
    {
        render(TodoItems, document.getElementById('todoItems'));
    }
}