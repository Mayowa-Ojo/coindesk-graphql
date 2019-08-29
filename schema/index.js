const { 
  GraphQLSchema, 
  GraphQLObjectType, 
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

/** Relative imports */
const BitcoinPrice = require('../services');

/** Define a query for the bitcoin price
 *  This query is modelled with respect to the state in the BitcoinPrice class
 */
const priceType = new GraphQLObjectType({
  name: 'price',
  description: 'price of bitcoin',
  fields: () => ({
    currentPrice: { type: GraphQLString }
  })
});

/** Define a root query */
const rootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    calculatePrice: {
      type: priceType,
      description: "Retrieve the current buying/selling price of Bitcoin in NGN",
      args: {
        type: { type: GraphQLNonNull(GraphQLString) },
        margin: { type: GraphQLNonNull(GraphQLString) },
        exchangeRate: { type: GraphQLInt, defaultValue: 360 }
      },
      resolve: async (parent, args) => {
        const { type, margin, exchangeRate } = args;
        const currentPrice = new BitcoinPrice(type, margin, exchangeRate)
        return currentPrice.getPrice();
      }
    }
  })
});

/** Define a graphql schema */
const schema = new GraphQLSchema({
  query: rootQueryType
});

module.exports = {
  schema
}