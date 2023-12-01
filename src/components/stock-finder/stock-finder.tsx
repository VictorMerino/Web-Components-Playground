import { Component, Event, EventEmitter, State, h } from '@stencil/core';

import { ALPHA_VANTAGE_API_KEY } from '../../global/globals';

@Component({
  tag: 'vic-stock-finder',
  styleUrl: 'stock-finder.css',
  shadow: true,
})
export class StockFinder {
  el: HTMLInputElement;

  @State() userInput: string;
  @State() bestMatches: { symbol: string; name: string }[];

  @Event({ bubbles: true, composed: true }) vicSymbolSelected: EventEmitter<string>;

  onSymbolSelected(symbol: string) {
    this.vicSymbolSelected.emit(symbol);
  }

  onUserInput = (event: Event) => {
    this.userInput = (event.target as HTMLInputElement).value;
    // this.userInputIsValid = !!this.userInput.trim();
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
    this.fetchSymbol(this.userInput);
  };

  async fetchSymbol(keywords: string) {
    const quote = 'SYMBOL_SEARCH';
    const apiUrl = 'https://www.alphavantage.co/query';
    const apiKey = keywords === 'BA' ? 'demo' : 'demo'; // `${ALPHA_VANTAGE_API_KEY}`;
    const fetchUri = `${apiUrl}?function=${quote}&keywords=${keywords}&apikey=${apiKey}`;
    try {
      const response = await fetch(fetchUri);
      const result = await response.json();
      console.log(result);

      const bestMatches = result['bestMatches'];
      if (!bestMatches) {
        if (result.Information) throw new Error(result.Information);
        throw new Error('No global quote');
      }
      this.bestMatches = bestMatches.map(match => {
        return {
          symbol: match['1. symbol'],
          name: match['2. name'],
        };
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return [
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref={el => (this.el = el as HTMLInputElement)} value={this.userInput} onInput={this.onUserInput} />
        <button type="submit">Find company</button>
      </form>,
      <ul>
        {this.bestMatches && this.bestMatches.length > 0
          ? this.bestMatches.map(match => (
              <li onClick={this.onSymbolSelected.bind(this, match.symbol)}>
                <strong>{match.symbol}</strong> - {match.name}
              </li>
            ))
          : 'na'}
      </ul>,
    ];
  }
}
