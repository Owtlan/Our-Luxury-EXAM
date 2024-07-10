import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';


const editTemplate = (album, onSubmit) => html`
            <section id="edit">
        <div class="form form-auto">
          <h2>Edit Your Car</h2>
          <form class="edit-form" @submit=${onSubmit}>
            <input type="text" name="model" id="model" placeholder="Model" .value=${album.model}/>
            <input
              type="text"
              name="imageUrl"
              id="car-image"
              placeholder="Your Car Image URL"
                .value=${album.imageUrl}
            />
            <input
              type="text"
              name="price"
              id="price"
              placeholder="Price in Euro"
                .value=${album.price}
            />
            <input
              type="number"
              name="weight"
              id="weight"
              placeholder="Weight in Kg"
                .value=${album.weight}
            />
            <input
              type="text"
              name="speed"
              id="speed"
              placeholder="Top Speed in Kmh"
                .value=${album.speed}
            />
            <textarea
              id="about"
              name="about"
              placeholder="More About The Car"
              rows="10"
              cols="50"
            >${album.about}</textarea>
            <button type="submit">Edit</button>
          </form>
        </div>
      </section>
`

const getAlbumDetails = (id) => {

    return fetch(`http://localhost:3030/data/cars/${id}`)
        .then(res => res.json())
};

const editAlbum = (id, album) => {
    return fetch(`http://localhost:3030/data/cars/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(album)
    })
        .then(res => res.json())
};


export const editView = (ctx) => {
    const albumId = ctx.params.albumId
console.log(albumId);
    getAlbumDetails(albumId)
        .then(album => {
            const onSubmit = (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                
                let model = document.getElementById('model').value
                let imageUrl = document.getElementById('car-image').value
                let price = document.getElementById('price').value
                let weight = document.getElementById('weight').value
                let speed = document.getElementById('speed').value
                let about = document.getElementById('about').value
            
                if (model === '' || imageUrl === '' || price === '' || weight === '' || speed === '' || about === '') {
                    window.alert('you need to fill all fields')
                    return
                }
            
                const editedAlbum = {
                    model,
                    imageUrl, 
                    price, 
                    weight,
                    speed,
                    about    
                };
                if (Object.values(editedAlbum).some(field => field.trim() === '')) {
                    return alert('All fields are required!');
                }

                editAlbum(albumId, editedAlbum)
                    .then(() => {
                        page.redirect(`/details/${albumId}`);
                    });
            }
            render(editTemplate(album, onSubmit), document.querySelector('#main-element'))
        })
}