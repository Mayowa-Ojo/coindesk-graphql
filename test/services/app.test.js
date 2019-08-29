const EasyGraphQLTester = require('easygraphql-tester');
const chai = require('chai');
const { assert, expect } = chai;
const { schema } = require('../../schema');

/** Relative imports */
const BitcoinPrice = require('../../services')

/** check if the api call returns valid data */
describe('fetchData method', () => {
  it('method should return an object', async () => {
    const bitcoinPrice = new BitcoinPrice();
    const data = await bitcoinPrice.fetchData();
    assert.typeOf(data, 'object', 'should be an object')
  })
})

/** check if the current price in the state is not null after running a query */
describe('current price', () => {
  it('current price in state should be a value', async () => {
    const bitcoinPrice = new BitcoinPrice('sell', '0.6', 360);
    const currentPrice = await bitcoinPrice.getPrice();
    assert.isNotNull(currentPrice, 'current price exists')
  })
})

/** check for valid query parameters */
describe('Query', () => {
  let tester;
  
  before(() => {
    tester = new EasyGraphQLTester(schema)
  })

  describe('missing variables', () => {
    it('should fail if query is invalid', () => {
      const query = `{
        calculatePrice(type: "buy", margin: "0.7") {
          currentPrice
        }
      }`;
      tester.test(true, query)
    })
  })
})