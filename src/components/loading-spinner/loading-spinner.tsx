import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'vic-loading-spinner',
  styleUrl: 'loading-spinner.css',
  shadow: true,
})
export class LoadingSpinner {
  render() {
    return (
      <Host>
        <div class="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Host>
    );
  }
}
