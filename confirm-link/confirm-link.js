class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener("click", (event) => {
      if (!confirm("Do you really want to go there?")) {
        event.preventDefault();
      }
    });
  }
}

customElements.define("vic-confirm-link", ConfirmLink, { extends: "a" });
