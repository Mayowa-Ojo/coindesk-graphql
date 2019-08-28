const express = require('express');
const env = require('dotenv');
const expressGraphQL = require('express-graphql');
const { schema } = require('./schema');

const app = express();
env.config();

/** Global variables */
const { log } = console;
const { PORT, NODE_ENV } = process.env;

app.get('/', async (req, res) => {
  res.send('Graphql api challenge')
})

/** GraphQL Route */
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));


app.listen(PORT, () => {
  log(`graphql server running in ${NODE_ENV} on port ${PORT}`);
});