import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'stock-price',
  styleUrl: 'stock-price.css',
})
export class StockPrice {
  @State() price = 0;
  async fetchStockPrice(event: Event) {
    event.preventDefault();
    console.log('submit');
    try {
      const response = await fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo');
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
