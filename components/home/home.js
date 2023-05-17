import {loadHtml} from "/lib.js";

export async function render()
{
    const html = await loadHtml('/components/home/home.html');
    return html.interpolate({});
}
