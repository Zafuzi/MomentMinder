import {listen, loadHtml} from '../lib.js';

export default 
{
    templateData: null,
    html: null,
    async init() {
        this.templateData = await fetch('https://jsonplaceholder.typicode.com/todos').then(response => response.json())
        this.html = await loadHtml("/components/TodoItems.html");
        return this.html.interpolate({
            data: this.templateData,
            renderItem: this.renderItem
        }); 
    },
    renderItem(item, index)
    {
        return (`
            <label>
                <input class="todoToggle" data-index="${index}" type="checkbox" ${item.completed ? "checked" : ""}/>
                <span class="${item.completed ? 'completed' : ''}">TODO: ${item.id} - ${item.title}</span>
            </label>
        `);
    },
    afterRender()
    {
        const instance = this;

        listen(".todoToggle", "change", function(event)
        {
            const {index} = event.target.dataset;
            const item = instance.templateData[index]; 
            const span = event.target.nextElementSibling;

            item.completed = !item.completed;
            if(item.completed)
            {
                span.classList.add('completed');
            }
            else
            {
                span.classList.remove('completed');
            }
        });
    }
}