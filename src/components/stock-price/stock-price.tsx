import { Component, h } from '@stencil/core';

@Component({
  tag: 'stock-price',
  styleUrl: 'stock-price.css',
})
export class StockPrice {
  fetchStockPrice(event: Event) {
    event.preventDefault();
    console.log('submit');
  }
  render() {
    return [
      <form onSubmit={this.fetchStockPrice}>
        <input type="text" id="stock-symbol" />
        <button type="submit">Fetch</button>
      </form>,

      <div>
        <p>Price: {0}</p>
      </div>,
    ];
  }
}
