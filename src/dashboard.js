import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';



let dashboardTemplate = (catalog) => html`
 <h3 class="heading">Our Cars</h3>
      <section id="dashboard">
        <!-- Display a div with information about every post (if any)-->
          ${catalog.length > 0 ? catalog.map(c => html`
        <div class="car">
          <img src="${c.imageUrl}" />
          <h3 class="model">${c.model}</h3>
          <div class="specs">
            <p class="price">Price: €${c.price}</p>
            <p class="weight">Weight: ${c.weight} kg</p>
            <p class="top-speed">Top Speed: ${c.speed} kph</p>
          </div>
          <a class="details-btn" href="/details/${c._id}">More Info</a>
        </div>
          `) : html`
          <!-- Display an h2 if there are no posts -->
          <h3 class="nothing">Nothing to see yet</h3>
            `}
      </section>
     `

const getCatalog = () => {
    return fetch('http://localhost:3030/data/cars?sortBy=_createdOn%20desc')
        .then(res => res.json())
        .then(data => Object.values(data))
}

export const catalogView = (ctx)=>
    getCatalog()
.then(catalog => render(dashboardTemplate(catalog), document.querySelector('#main-element')))