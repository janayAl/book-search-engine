const { gql } = require('apollo-server-express');
const typeDefs = gql`

type Book {
    _id:ID!
    bookId: String
    authors: String
}

type User{
    _id: ID!
    username: String
    email: String
    

}

module.exports = typeDefs;