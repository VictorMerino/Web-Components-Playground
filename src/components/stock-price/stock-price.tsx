import { Component, State, h, Element } from '@stencil/core';

import { ALPHA_VANTAGE_API_KEY } from '../../global/globals';

@Component({
  tag: 'stock-price',
  styleUrl: 'stock-price.css',
  shadow: true,
})
export class StockPrice {
  @Element() el: HTMLElement;
  @State() price = 0;
  async fetchStockPrice(event: Event) {
    event.preventDefault();

    const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value || 'IBM';
    const quote = 'GLOBAL_QUOTE';
    const apiUrl = 'https://www.alphavantage.co/query';
    const fetchUri = `${apiUrl}?function=${quote}&symbol=${stockSymbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;

    try {
      const response = await fetch(fetchUri);
      const result = await response.json();
      this.price = result['Global Quote']['05. price'];
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return [
      <form onSubmit={this.fetchStockPrice.bind(this)}>
        <input type="text" id="stock-symbol" />
        <button type="submit">Fetch</button>
      </form>,

      <div>
        <p>Price: {this.price}</p>
      </div>,
    ];
  }
}
