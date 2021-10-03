const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utilsauth');
const { typeDefs, resolvers } = require('./'schemas'); 

const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers
});

//comes from the express server and connects the express with the apollo 
server.applyMiddleware({ app });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}


//once the connection to the database is open...(from the mongoose driver)

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http:localhost:${PORT}${server.graphqlPath}`);
  });
