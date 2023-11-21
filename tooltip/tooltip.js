class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipIcon;
    this._tooltipText = "Default text";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        div {
          background-color: var(--color-primary);
          color: white;
          position: absolute;
          top: 1.25rem;
          right: 0;
          padding: 6px 10px;
          border-radius: 3px;
          box-shadow: 1px 1px 6px rgba(0, 0, 0, .26);
          z-index: 2;
        }

        :host {
          position: relative;
          background-color: #fbecec
        }

        :host(.green) {
          background-color: var(--color-green)
        }

        :host-context(p.bold) {
          font-weight: bold
        }

        ::slotted(span) {
          background-color: orange;
          /*
            Slotted styles always can be overriden by the light-dom.
            The user should always have the last word
          */
        }

        .icon {
          background-color: #73d1ef;
          color: white;
          padding: .25rem .35rem;
          border-radius: 50%;
          font-size: 12px
        }
      </style>
      <span class="icon">(*)</span>
      <slot><span>Default slot content</span></slot>
    `;
  }

  static get observedAttributes() {
    return ['text']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log({name, oldValue, newValue});
    if (oldValue === newValue) return

    if(name === 'text') {
      this._tooltipText = newValue
    }
  }

  _toggle(show) {
    let tooltipContainer = this.shadowRoot.querySelector('div')
    if(show) this._show(tooltipContainer)
    else this._hide(tooltipContainer)
  }

  _show(tooltipContainer) {
    tooltipContainer = document.createElement("div");
    tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(tooltipContainer);
  }

  _hide(tooltipContainer) {
    this.shadowRoot.removeChild(tooltipContainer);
  }

  // onMounted
  connectedCallback() {
    const textAttribute = this.getAttribute("text");
    if (textAttribute) this._tooltipText = textAttribute;
    this._tooltipIcon = this.shadowRoot.querySelector("span");
    this._tooltipIcon.addEventListener("mouseenter", this._toggle.bind(this, true));
    this._tooltipIcon.addEventListener("mouseleave", this._toggle.bind(this, false));
    this.shadowRoot.appendChild(this._tooltipIcon);
  }

  // onDestroy
  disconnectedCallback() {
    console.log('Clean up event listener on component destroy');
    this._tooltipIcon.removeEventListener("mouseenter", this._show);
    this._tooltipIcon.removeEventListener("mouseleave", this._hide);
  }

}

customElements.define("vic-tooltip", Tooltip);
