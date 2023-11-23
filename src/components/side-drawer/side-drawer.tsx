import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'vic-side-drawer',
  styleUrl: 'side-drawer.css',
  shadow: true,
})
export class SideDrawer {
  // "Reflect" property reflect the attr change in the light dom HTML
  @Prop({ reflect: true }) sdTitle: string;
  @Prop() open: boolean;

  render() {
    if (!this.open) return null;

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
