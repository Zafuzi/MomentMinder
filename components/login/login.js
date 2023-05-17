import {listen, loadHtml} from "/lib.js";

const data = {
    loginError: "",
}

export async function render()
{
    const html = await loadHtml("login");
    return html.interpolate(data);
}

export async function afterRender()
{
    listen("#loginForm", "submit", async (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');
        
        alert(`Username: ${username}, Password: ${password}`);
    });
}