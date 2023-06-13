import * as gu from "./gallery_ui.js";
import * as g from "./gallery.js";
import * as ph from "./photoloader.js";
import * as u from "./ui.js";

const getPicture = function (id) {
    let photo = ph.loadPicture(id);
    u.displayPicture(photo);
    getDataCategorie(photo);
    getDataComments(photo);
}

const getDataCategorie = function (data) {
    data.then(
        (result) => {
            let url = `${result.links.categorie.href}`;
            let dataCat = ph.loadRessource(url);
            u.getCategorie(dataCat);
        }
    );
}

const getDataComments = function (data) {
    data.then(
        (result) => {
            let url = `${result.links.comments.href}`;
            let dataCom = ph.loadRessource(url);
            u.getComments(dataCom);
        }
    );
}

document.querySelector("#load_gallery").addEventListener(
    "click",
    (e) => {
        u.resetPicture();
        let loading = g.load();
        let dataGalleries = gu.display_galerie(loading);
    }
);

document.querySelector("#previous_page").addEventListener(
    "click",
    async (e) => {
        u.resetPicture();
        let loading = await g.loadPrev();
        let dataGalleries = await gu.display_galerie(loading);
    }
);

document.querySelector("#next_page").addEventListener(
    "click",
    async (e) => {
        u.resetPicture();
        let loading = await g.loadNext();
        let dataGalleries = await gu.display_galerie(loading);
    }
);

document.querySelector("#first_page").addEventListener(
    "click",
    async (e) => {
        u.resetPicture();
        let loading = await g.loadFirst();
        let dataGalleries = await gu.display_galerie(loading);
    }
);

document.querySelector("#last_page").addEventListener(
    "click",
    async (e) => {
        u.resetPicture();
        let loading = await g.loadLast();
        let dataGalleries = await gu.display_galerie(loading);
    }
);


document.querySelectorAll("#gallery_container").forEach(
    (vignette) => {
        vignette.addEventListener(
            "click",
            (e) => {
                let id = e.target.getAttribute("data-photoid");
                if (id!=null){
                    getPicture(id);
                }
            }
        )
    }
)



