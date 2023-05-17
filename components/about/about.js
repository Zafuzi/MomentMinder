import {loadHtml} from "/lib.js";

export async function render()
{
    const html = await loadHtml("about");
    return html.interpolate({});
}