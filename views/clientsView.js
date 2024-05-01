import View from "./View.js";

class ClientsView extends View {
  // mimics "results view"
  _generateMarkup() {
    return `
        <div class="card card--client">
            <div class="card__img client-logo"></div>
            <div class="card__content">
                <h1 class="card__title client-name">${clientName}</h1>
                <ul class="card__items">
                    <li class="card__item">
                        <div class="item-icon"></div>
                        <span class="item-count location-count">${locationCount}</span> Locations
                    </li>
                </ul>
            </div>
        </div>
        `;
  }
}
