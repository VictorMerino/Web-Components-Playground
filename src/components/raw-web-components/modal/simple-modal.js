class SimpleModal extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this._isModalOpen = false;
    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        #backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.75);
          z-index: 10;
        }
        #modal {
          flex-direction: column;
          justify-content: space-between;
          z-index: 11;
          position: fixed;
          top: 15vh;
          left: 25%;
          padding: 2rem 3rem;
          width: 40%;
          min-height: 20rem;
          background-color: white;
          border-radius: 1rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        }

        #backdrop,
        #modal {
          display: none
        }

        :host([open]) #backdrop {
          display: block
        }

        :host([open]) #modal {
          display: flex
        }

        .modal-header {}
        .modal-main {}

        .modal-footer {
          border-top: 1px solid #ececec;
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding-top: 1rem
        }

        button {
          padding: 6px 10px;
          border-radius: .25rem;
          border-color: #ececec;
        }
        .button-primary {
          background-color: var(--color-button-primary);
          color: white
        }
      </style>
      <div id="modal" class="hidden">
        <section class="modal-header">
          <h3>Header</h3>
        </section>
        <section class="modal-main">
          <slot>Modal content</slot>
        </section>
        <section class="modal-footer">
          <button id="cancel">Close</button>
      </div>
      <div id="backdrop" class="hidden"></div>
    `
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#cancel').addEventListener('click', this._close.bind(this))
  }

  _close() {
    console.log('close')
    this.removeAttribute('open')
  }

}

customElements.define('vic-simple-modal', SimpleModal)