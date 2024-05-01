import icons from "url:../public/dist/assets/icons.svg";

export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. client/site)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string}
   * @this {Object} View instance
   * @author Nicole Parker
   */
  render(data, render = true) {
    // Render an error if there is no data
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  // Update view
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup); // Create a "virtual DOM"
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i]; // Loop over both elements at the same time

      // Update the changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update the changed attributes
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  // Clear view
  _clear() {
    this._parentElement.innerHTML = "";
  }

  // Render spinner
  renderSpinner() {
    const markup = `
        <div class="spinner">
            <svg>
                <use href="${icons}#icon-loader"></use>
            </svg>
        </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  // Render error
  renderError(message = this._errorMessage) {
    const markup = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  // Render messages
  renderMessage(message = this._message) {
    const markup = `
            <div class="client">
                <div class="message">
                    <div>
                        <svg>
                            <use href="${icons}#icon-smile"></use>
                        </svg>
                    </div>
                    <p>${message}</p>
                </div>
            </div>
        `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
