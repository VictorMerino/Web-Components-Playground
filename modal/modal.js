class Modal extends HTMLElement {
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
          display: flex;
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

        .hidden { display: none!important }

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
          <slot name="header">
            <h3>Header</h3>
          </slot>
        </section>
        <section class="modal-main">
          <slot>Modal content</slot>
        </section>
        <section class="modal-footer">
          <button id="cancel">Cancel</button>
          <button id="confirm" class="button-primary">Confirm</button>
      </div>
      <div id="backdrop" class="hidden"></div>
    `
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return

    if (name === 'open') {
      if (this.hasAttribute('open')) {
        console.log(document.querySelector('#backdrop'))
        this.shadowRoot.querySelector('#backdrop').classList.remove('hidden')
        this.shadowRoot.querySelector('#modal').classList.remove('hidden')
      }
      else {
        this.shadowRoot.querySelector('#backdrop').classList.add('hidden')
        this.shadowRoot.querySelector('#modal').classList.add('hidden')
      }
    }
  }

  static get observedAttributes() {
    return ['open']
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#confirm', this._confirm.bind(this))
    this.shadowRoot.querySelector('#confirm').addEventListener('click', this._confirm.bind(this))
    this.shadowRoot.querySelector('#cancel').addEventListener('click', this._cancel.bind(this))

    const slots = this.shadowRoot.querySelectorAll('slot')
    slots[1].addEventListener('slotchange', event => {
      // Note: this event doesn't fire if the children change
      // only if the full parent does it
      console.dir(slots[1].assignedNodes())
    })
  }

  _confirm() {
    console.log('Confirm btn')
    this._close()
  }

  _cancel() {
    console.log('Cancel btn')
    this._close()
  }

  _close() {
    this.removeAttribute('open')
  }

  open() {
    this.setAttribute('open', '')
  }


}

customElements.define('vic-modal', Modal)