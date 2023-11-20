class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
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

  connectedCallback() {
    const textAttribute = this.getAttribute("text");
    if (textAttribute) this._tooltipText = textAttribute;
    const tooltipIcon = this.shadowRoot.querySelector("span");
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define("vic-tooltip", Tooltip);
