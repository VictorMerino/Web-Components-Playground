import { Component, State, h } from '@stencil/core';

import { ALPHA_VANTAGE_API_KEY } from '../../global/globals';

@Component({
  tag: 'stock-price',
  styleUrl: 'stock-price.css',
  shadow: true,
})
export class StockPrice {
  el!: HTMLInputElement;

  @State() price = 0;
  @State() userInput: string;
  @State() userInputIsValid = false;

  onUserInput = (event: Event) => {
    this.userInput = (event.target as HTMLInputElement).value;
    this.userInputIsValid = !!this.userInput.trim();
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
    const stockSymbol = this.el.value;
    this.fetchStockPrice(stockSymbol);
  };

  async fetchStockPrice(stockSymbol: string) {
    // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value || 'IBM';
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
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref={el => (this.el = el as HTMLInputElement)} value={this.userInput} onInput={this.onUserInput} />
        <button type="submit" disabled={!this.userInputIsValid}>
          Fetch
        </button>
      </form>,

      <div>
        <p>Price: {this.price}</p>
      </div>,
    ];
  }
}
