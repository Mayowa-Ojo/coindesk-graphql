const fetch = require('node-fetch');

/** Global variables */
const BASE_URL = "https://api.coindesk.com/v1/bpi/currentprice.json";
const { log } = console;

/**
 * @constructor
 * @param {string} type - specify either 'buy' or 'sell'
 * @param {string} margin - percentage used for calculation
 */

// create a class to handle all queries
class BitcoinPrice {
  constructor(type, margin, exchangeRate) {
    this.state = {
      rate: null,
      currentPrice: null
    };
    this.type = type;
    this.margin = margin;
    this.exchangeRate = exchangeRate;
  }

  // make a call to the coindesk api
  async fetchData () {
    const response = await fetch(BASE_URL)
    const data = await response.json()
    return data;
  }

  async filterPrice () {
    const data = await this.fetchData();
    // get the rate from the json response and store in state
    const { rate_float: rate } = data.bpi.USD
    this.state.rate = rate;

    // run calculations and set result in state
    if(this.type === 'buy') {
      const computedMargin = parseFloat(this.margin) / 100;
      const computedPrice = this.state.rate + computedMargin;
      const priceInNGN = computedPrice * this.exchangeRate;
      this.state.currentPrice = priceInNGN;
    } else if(this.type === 'sell') {
      const computedMargin = parseFloat(this.margin) / 100;
      const computedPrice = this.state.rate - computedMargin;
      const priceInNGN = computedPrice * this.exchangeRate;
      this.state.currentPrice = priceInNGN;
    }
  }

  async getPrice() {
    // call the filterPrice method and return the current state
    await this.filterPrice();
    return this.state;
  }
}

module.exports = BitcoinPrice;