import * as ph from "./photoloader.js";

let prev = "";
let next = "";
let first = "";
let last = "";

export async function load(hrefpage)
{
    let prev1 = "";
    let next1 = "";

    let href = "/www/canals5/phox/api/photos";
    if (hrefpage!=undefined)
    {
        href = hrefpage;
    }

    
    let pr = ph.loadRessource(href);
    await pr.then((data) => {

        return data;

    })
    .then(data => {
        prev1 = data.links.prev.href;
        next1 = data.links.next.href;
        first = data.links.first.href;
        last = data.links.last.href;

        let linkphotos = data.photos;

        return linkphotos;
    })
    .catch((error) => {
        console.log(error);;
    });


    prev = prev1;
    next = next1;
    return pr;
}

export async function loadPrev() {
    let res = await load(prev);
    return res;
}

export async function loadNext() {
    let res = await load(next);
    return res;
}

export async function loadFirst() {
    let res = await load(first);
    return res;
}

export async function loadLast() {
    let res = await load(last);
    return res;
}


export default {
    
}