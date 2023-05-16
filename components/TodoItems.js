import { listen } from '../lib.js';

export default 
{
    templateData: null,
    async init() {
        this.templateData = await fetch('https://jsonplaceholder.typicode.com/todos').then(response => response.json())

        return (`
            <div style="display: flex; flex-direction: column;">
                ${this.templateData?.map(this.renderItem).join('')}
            </div>
        `);
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