(() => {
  // lib/gallery_ui.js
  async function display_galerie(gallery) {
    let espace_gallery = document.querySelector("#gallery_container");
    espace_gallery.innerHTML = "";
    if (gallery.type != "collection") {
      await gallery.then(
        (data) => {
          let dataP = data.photos;
          for (let i = 0; i < dataP.length; i++) {
            espace_gallery.innerHTML += `
                    <div class="vignette" >
                        <img data-photoId="${dataP[i].photo.id}"
                        src="https://webetu.iutnc.univ-lorraine.fr${dataP[i].photo.thumbnail.href}">
                    </div>
                    `;
          }
          return dataP;
        }
      );
    } else {
      let dataP = gallery.photos;
      for (let i = 0; i < dataP.length; i++) {
        espace_gallery.innerHTML += `
            <div class="vignette" >
                <img data-photoId="${dataP[i].photo.id}"
                src="https://webetu.iutnc.univ-lorraine.fr${dataP[i].photo.thumbnail.href}">
            </div>
            `;
      }
      return dataP;
    }
  }

  // lib/photoloader.js
  async function loadPicture(idPicture) {
    let pr = await fetch(
      "https://webetu.iutnc.univ-lorraine.fr/www/canals5/phox/api/photos/" + idPicture,
      { credentials: "include" }
    );
    let data;
    if (pr.ok) {
      data = await pr.json();
    }
    return data;
  }
  async function loadRessource(url) {
    let pr = await fetch(
      `https://webetu.iutnc.univ-lorraine.fr${url}`,
      { credentials: "include" }
    );
    let data;
    if (pr.ok) {
      data = await pr.json();
    }
    return data;
  }

  // lib/gallery.js
  var prev = "";
  var next = "";
  var first = "";
  var last = "";
  async function load(hrefpage) {
    let prev1 = "";
    let next1 = "";
    let href = "/www/canals5/phox/api/photos";
    if (hrefpage != void 0) {
      href = hrefpage;
    }
    let pr = loadRessource(href);
    await pr.then((data) => {
      return data;
    }).then((data) => {
      prev1 = data.links.prev.href;
      next1 = data.links.next.href;
      first = data.links.first.href;
      last = data.links.last.href;
      let linkphotos = data.photos;
      return linkphotos;
    }).catch((error) => {
      console.log(error);
      ;
    });
    prev = prev1;
    next = next1;
    return pr;
  }
  async function loadPrev() {
    let res = await load(prev);
    return res;
  }
  async function loadNext() {
    let res = await load(next);
    return res;
  }
  async function loadFirst() {
    let res = await load(first);
    return res;
  }
  async function loadLast() {
    let res = await load(last);
    return res;
  }

  // lib/ui.js
  function displayPicture(image) {
    let espacePhoto = document.querySelector("#la_photo");
    image.then((result) => {
      espacePhoto.innerHTML = `
        <h1> Photo : ${result.photo.id}</h1>
        <img src="https://webetu.iutnc.univ-lorraine.fr${result.photo.url.href}" alt="photo">
        <h4>${result.photo.titre}</h4>
        <p>${result.photo.descr}</p>
        <p>${result.photo.type}, ${result.photo.width} x ${result.photo.height}</p>
        `;
    });
  }
  function getCategorie(data) {
    let espacePhoto = document.querySelector("#la_photo");
    data.then(
      (result) => {
        espacePhoto.innerHTML += `
            <h4 id="la_categorie">categorie : ${result.categorie.nom}</h4>
            `;
      }
    );
  }
  function getComments(data) {
    let espacePhoto = document.querySelector("#la_photo");
    data.then(
      (result) => {
        espacePhoto.innerHTML += `
                <h4>commentaires : </h4>
                <ul id="les_commentaires">
            `;
        for (let i = 0; i < result.size; i++) {
          let pseudo = result.comments[i].pseudo;
          if (result.comments[i].content != "") {
            espacePhoto.innerHTML += `
                        <li>
                        (${pseudo}) 
                        ${result.comments[i].titre}
                        ${result.comments[i].content}
                        </li>
                    `;
          }
        }
        espacePhoto.innerHTML += `</ul>`;
      }
    );
  }
  function resetPicture() {
    let espacePhoto = document.querySelector("#la_photo");
    espacePhoto.innerHTML = "";
  }

  // lib/index.js
  var getPicture = function(id) {
    let photo = loadPicture(id);
    displayPicture(photo);
    getDataCategorie(photo);
    getDataComments(photo);
  };
  var getDataCategorie = function(data) {
    data.then(
      (result) => {
        let url = `${result.links.categorie.href}`;
        let dataCat = loadRessource(url);
        getCategorie(dataCat);
      }
    );
  };
  var getDataComments = function(data) {
    data.then(
      (result) => {
        let url = `${result.links.comments.href}`;
        let dataCom = loadRessource(url);
        getComments(dataCom);
      }
    );
  };
  document.querySelector("#load_gallery").addEventListener(
    "click",
    (e) => {
      resetPicture();
      let loading = load();
      let dataGalleries = display_galerie(loading);
    }
  );
  document.querySelector("#previous_page").addEventListener(
    "click",
    async (e) => {
      resetPicture();
      let loading = await loadPrev();
      let dataGalleries = await display_galerie(loading);
    }
  );
  document.querySelector("#next_page").addEventListener(
    "click",
    async (e) => {
      resetPicture();
      let loading = await loadNext();
      let dataGalleries = await display_galerie(loading);
    }
  );
  document.querySelector("#first_page").addEventListener(
    "click",
    async (e) => {
      resetPicture();
      let loading = await loadFirst();
      let dataGalleries = await display_galerie(loading);
    }
  );
  document.querySelector("#last_page").addEventListener(
    "click",
    async (e) => {
      resetPicture();
      let loading = await loadLast();
      let dataGalleries = await display_galerie(loading);
    }
  );
  document.querySelectorAll("#gallery_container").forEach(
    (vignette) => {
      vignette.addEventListener(
        "click",
        (e) => {
          let id = e.target.getAttribute("data-photoid");
          if (id != null) {
            getPicture(id);
          }
        }
      );
    }
  );
})();
