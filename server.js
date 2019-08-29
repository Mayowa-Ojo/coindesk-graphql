const env            = require('dotenv');
const path           = require('path');
const express        = require('express');
const expressGraphQL = require('express-graphql');

/** Relative imports */
const { schema } = require('./schema');

const app = express();
env.config();

/** Global variables */
const { log } = console;
const { PORT, NODE_ENV } = process.env;

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', './views');

/** GraphQL Route */
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

/** Root route */
app.get('/', async (req, res) => {
  // res.render('index');
  res.sendFile(path.join(__dirname, './static/index.html'))
});

/** Redirect to graphiQL interface */
app.get('/playground', (req, res) => {
  res.redirect('/graphql')
});

app.listen(PORT, () => {
  log(`graphql server running in ${NODE_ENV} on port ${PORT}`);
});