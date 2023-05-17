import {loadHtml} from "/lib.js";

export async function render()
{
    const html = await loadHtml('/components/about/about.html');
    return html.interpolate({});
}