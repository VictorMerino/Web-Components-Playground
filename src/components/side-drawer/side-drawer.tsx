import { Component, Method, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'vic-side-drawer',
  styleUrl: 'side-drawer.css',
  shadow: true,
})
export class SideDrawer {
  // "Reflect" property reflect the attr change in the light dom HTML
  @Prop({ reflect: true }) sdTitle: string;
  // If we're only going to change some styles it isn't actually needed:
  @Prop({ reflect: true, mutable: true }) opened: boolean;

  @State() tabOpened = 'nav';
  @State() mainContent = (<slot />);

  closeDrawer() {
    this.opened = false;
  }

  @Method()
  async open() {
    console.log('Open method');
    this.opened = true;
  }

  onTabChange(content: string) {
    console.log(content);
    this.tabOpened = content;
    if (content === 'contact') {
      this.mainContent = (
        <div id="contact-info">
          <h2>Contact info</h2>
          <div>You can reach us via phone or email</div>
          <ul>
            <li>Phone: 666 000 666</li>
            <li>E-mail: mail@mail.to</li>
          </ul>
        </div>
      );
    } else this.mainContent = <slot />;
  }

  render() {
    // // Easy but less powerful way:
    // if (!this.opened) return null;

    return [
      <aside>
        <header>
          <button onClick={this.closeDrawer.bind(this)}>X</button>
          <p>{this.sdTitle}</p>
        </header>
        <section id="tabs">
          <button onClick={this.onTabChange.bind(this, 'nav')} class={this.tabOpened === 'nav' ? 'active' : ''}>
            Nav
          </button>
          <button onClick={this.onTabChange.bind(this, 'contact')} class={this.tabOpened === 'contact' ? 'active' : ''}>
            Contact
          </button>
        </section>
        <main>{this.mainContent}</main>
      </aside>,
      <div id="backdrop" onClick={this.closeDrawer.bind(this)}></div>,
    ];
  }
}
