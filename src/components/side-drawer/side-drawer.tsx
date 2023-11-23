import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'vic-side-drawer',
  styleUrl: 'side-drawer.css',
  shadow: true,
})
export class SideDrawer {
  // "Reflect" property reflect the attr change in the light dom HTML
  @Prop({ reflect: true }) sdTitle: string;
  // If we're only going to change some styles it isn't actually needed:
  @Prop({ reflect: true, mutable: true }) open: boolean;

  onCloseDrawer() {
    this.open = false;
  }

  render() {
    // // Easy but less powerful way:
    // if (!this.open) return null;

    return (
      <aside>
        <header>
          <button onClick={this.onCloseDrawer.bind(this)}>X</button>
          <p>{this.sdTitle}</p>
        </header>
        <main>
          <slot />
        </main>
      </aside>
    );
  }
}
