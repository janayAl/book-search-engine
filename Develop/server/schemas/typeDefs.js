const { gql } = require('apollo-server-express');
const typeDefs = gql`

type Book {
    _id:ID
    bookId: String
    authors: String
}