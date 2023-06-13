
export function displayPicture (image) {
    let espacePhoto = document.querySelector("#la_photo");

    image.then((result) => {

        espacePhoto.innerHTML =  `
        <h1> Photo : ${result.photo.id}</h1>
        <img src="https://webetu.iutnc.univ-lorraine.fr${result.photo.url.href}" alt="photo">
        <h4>${result.photo.titre}</h4>
        <p>${result.photo.descr}</p>
        <p>${result.photo.type}, ${result.photo.width} x ${result.photo.height}</p>
        `;

    });
}

export function getCategorie(data){
    let espacePhoto = document.querySelector("#la_photo");

    data.then(
        (result) => {            
            espacePhoto.innerHTML += `
            <h4 id="la_categorie">categorie : ${result.categorie.nom}</h4>
            `;

        }
    );
}

export function getComments(data){
    let espacePhoto = document.querySelector("#la_photo");

    data.then(
        (result) => {

            espacePhoto.innerHTML += `
                <h4>commentaires : </h4>
                <ul id=\"les_commentaires\">
            `;

            for (let i = 0 ; i < result.size ; i++){

                let pseudo = result.comments[i].pseudo;

                if (result.comments[i].content!=""){
                    espacePhoto.innerHTML +=  `
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

export function resetPicture()
{
    let espacePhoto = document.querySelector("#la_photo");
    espacePhoto.innerHTML = "";
}

export default {

}