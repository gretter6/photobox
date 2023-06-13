export async function loadPicture (idPicture) {
    let pr = await fetch("https://webetu.iutnc.univ-lorraine.fr/www/canals5/phox/api/photos/"+idPicture,
    { credentials: 'include'}
    );

    let data;

    if (pr.ok) {
        data = await pr.json();
    }

    return data;

}

export async function loadRessource (url) {
    let pr = await fetch(`https://webetu.iutnc.univ-lorraine.fr${url}`,
    { credentials: 'include'}
    );

    let data;

    if (pr.ok) {
        data = await pr.json();
    }

    return data;

}

export default {

}