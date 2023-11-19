class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = "Default text";
    this.attachShadow({ mode: "open" });
    const template = document.querySelector("#vic-tooltip-template");
    this.shadowRoot.appendChild(template.content.cloneNode(true));
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
    this._tooltipContainer.style.backgroundColor = "black";
    this._tooltipContainer.style.color = "white";
    this._tooltipContainer.style.position = "absolute";
    this._tooltipContainer.style.padding = "6px 10px";
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define("vic-tooltip", Tooltip);
