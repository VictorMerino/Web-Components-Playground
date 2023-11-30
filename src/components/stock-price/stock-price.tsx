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
  @State() error: string;

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

      const globalQuote = result['Global Quote'];
      if (!globalQuote) {
        if (result.Information) throw new Error(result.Information);
        throw new Error('No global quote');
      }
      const price = globalQuote['05. price'];
      if (!price) throw new Error('Invalid symbol');
      this.error = null;
      this.price = price;
    } catch (err) {
      this.error = err.message;
    }
  }
  render() {
    // TO-DO: this code can be improved, 4 sure. Refactor later, please...
    // If no input, also 'enter a symbol' should be shown
    let resultContent = <p>Please, enter a symbol!</p>;
    if (this.error) resultContent = <p class="error">{this.error}</p>;
    else if (!this.price) resultContent = <p>Please, enter a symbol!</p>;
    else resultContent = <p>Price: {this.price}</p>;
    return [
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref={el => (this.el = el as HTMLInputElement)} value={this.userInput} onInput={this.onUserInput} />
        <button type="submit" disabled={!this.userInputIsValid}>
          Fetch
        </button>
      </form>,

      <div>{resultContent}</div>,
    ];
  }
}
