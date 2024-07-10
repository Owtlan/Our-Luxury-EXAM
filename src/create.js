import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';


const createTemplate = () => html`
 <section id="create">
        <div class="form form-auto">
          <h2>Share Your Car</h2>
          <form class="create-form" @submit=${addItem}>
            <input type="text" name="model" id="model" placeholder="Model"/>
            <input
              type="text"
              name="imageUrl"
              id="car-image"
              placeholder="Your Car Image URL"
            />
            <input
              type="text"
              name="price"
              id="price"
              placeholder="Price in Euro"
            />
            <input
              type="number"
              name="weight"
              id="weight"
              placeholder="Weight in Kg"
            />
            <input
              type="text"
              name="speed"
              id="speed"
              placeholder="Top Speed in Kmh"
            />
            <textarea
              id="about"
              name="about"
              placeholder="More About The Car"
              rows="10"
              cols="50"
            ></textarea>
            <button type="submit">Add</button>
          </form>
        </div>
      </section>

`

function addItem(e) {
    e.preventDefault()

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


    fetch('http://localhost:3030/data/cars', {
        method: 'POST',
        headers: {
            'X-Authorization': localStorage.token
        },
        body: JSON.stringify({
            model,
            imageUrl, 
            price, 
            weight,
            speed,
            about          
        })
    })
        .then(res => res.json())
        .then(data => {
            page.redirect('/dashboard')
        })
        .catch(error => alert(error.message))
}

export const createView = (ctx) =>
    render(createTemplate(), document.querySelector('#main-element'))