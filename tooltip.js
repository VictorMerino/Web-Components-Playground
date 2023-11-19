class Tooltip extends HTMLElement {
  constructor() {
    super();
    console.log("It works");
  }
}

customElements.define("vic-tooltip", Tooltip);
