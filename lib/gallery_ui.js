export async function display_galerie(gallery) 
{
    let espace_gallery = document.querySelector("#gallery_container");
    espace_gallery.innerHTML = "";
    if (gallery.type != "collection"){

        await gallery.then(
            (data) => {

                let dataP = data.photos;

                for(let i = 0 ; i < dataP.length ; i++)
                {
                    espace_gallery.innerHTML += `
                    <div class="vignette" >
                        <img data-photoId="${dataP[i].photo.id}"
                        src="https://webetu.iutnc.univ-lorraine.fr${dataP[i].photo.thumbnail.href}">
                    </div>
                    `;
                }

                return dataP;
            }
        )
    }else{

        let dataP = gallery.photos;

        for(let i = 0 ; i < dataP.length ; i++)
        {
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


export default {

}