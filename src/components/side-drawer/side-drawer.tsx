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
  @Prop({ reflect: true }) open: boolean;

  render() {
    // // Easy but less powerful way:
    // if (!this.open) return null;

    return (
      <aside>
        <header>
          <p>{this.sdTitle}</p>
        </header>
        <main>
          <slot />
        </main>
      </aside>
    );
  }
}
