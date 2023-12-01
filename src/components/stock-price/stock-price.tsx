import { Component, Listen, Prop, State, Watch, h } from '@stencil/core';

import { ALPHA_VANTAGE_API_KEY } from '../../global/globals';

@Component({
  tag: 'vic-stock-price',
  styleUrl: 'stock-price.css',
  shadow: true,
})
export class StockPrice {
  el!: HTMLInputElement;

  @Prop({ mutable: true, reflect: true }) stockSymbol: string;

  @Watch('stockSymbol')
  stockSymbolChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.userInput = newValue;
      this.fetchStockPrice(newValue);
    }
  }

  @State() price = 0;
  @State() userInput: string;
  @State() userInputIsValid = false;
  @State() error: string;
  @State() resultContent = (<p>Please, enter a symbol!</p>);
  @State() isLoading = false;

  onUserInput = (event: Event) => {
    this.userInput = (event.target as HTMLInputElement).value;
    this.userInputIsValid = !!this.userInput.trim();
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
    this.stockSymbol = this.el.value;
  };

  async fetchStockPrice(stockSymbol: string) {
    this.isLoading = true;
    // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value || 'IBM';
    const quote = 'GLOBAL_QUOTE';
    const apiUrl = 'https://www.alphavantage.co/query';
    const apiKey = stockSymbol === 'IBM' ? 'demo' : 'demo'; // `${ALPHA_VANTAGE_API_KEY}`;
    const fetchUri = `${apiUrl}?function=${quote}&symbol=${stockSymbol}&apikey=${apiKey}`;

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
    } finally {
      // TO-DO: this code can be improved, 4 sure. Refactor later, please...
      // If no input, also 'enter a symbol' should be shown
      if (this.error) this.resultContent = <p class="error">{this.error}</p>;
      else if (!this.error && this.price) this.resultContent = <p>Price: {this.price}</p>;
      this.isLoading = false;
    }
  }

  // Lifecycle hooks:

  componentWillLoad() {
    console.log('componentWillLoad', this.stockSymbol);
    if (this.stockSymbol) {
      this.userInput = this.stockSymbol;
      this.userInputIsValid = true;
    }
  }

  componentDidLoad() {
    if (this.stockSymbol) {
      this.fetchStockPrice(this.stockSymbol);
    }
  }

  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  disconnectedCallback() {
    console.log('disconnectedCallback');
  }

  @Listen('vicSymbolSelected', { target: 'body' })
  onStockSymbolSelected(event: CustomEvent) {
    console.log('Listened from inside StockPrice component', event.detail);
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
    }
  }

  // BE AWARE: this method is deprecated!
  hostData() {
    return {
      class: {
        error: this.error,
        loading: this.isLoading,
      },
    };
  }

  render() {
    return [
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref={el => (this.el = el as HTMLInputElement)} value={this.userInput} onInput={this.onUserInput} />
        <button type="submit" disabled={!this.userInputIsValid || this.isLoading}>
          Fetch stocks
        </button>
      </form>,

      <div>{this.resultContent}</div>,
      <div>{this.isLoading && <vic-loading-spinner />}</div>,
    ];
  }
}
