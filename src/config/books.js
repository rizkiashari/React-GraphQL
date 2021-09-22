import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query GETALLBooks {
    getAllBooks {
      _id
      title
    }
  }
`;

// Bedakan nama function mutation di BE dengan nama function mutation di FE
export const NEW_BOOK = gql`
  mutation CreateBook(
    $title: String!
    $author: String!
    $description: String
    $release_year: Int!
    $genre: String!
  ) {
    createBook(
      title: $title
      author: $author
      description: $description
      release_year: $release_year
      genre: $genre
    ) {
      _id
      title
      author
      description
      release_year
      genre
    }
  }
`;

export const GET_BOOK_DETAIL = gql`
  query GetBook($_id: ID!) {
    getBook(_id: $_id) {
      _id
      title
      author
      description
      release_year
      genre
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $_id: ID!
    $title: String!
    $author: String!
    $description: String
    $release_year: Int!
    $genre: String!
  ) {
    updateBook(
      _id: $_id
      title: $title
      author: $author
      description: $description
      release_year: $release_year
      genre: $genre
    ) {
      _id
      title
      author
      description
      release_year
      genre
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($_id: ID!) {
    deleteBook(_id: $_id) {
      true
    }
  }
`;

const books = {
  NEW_BOOK,
  GET_BOOKS,
  UPDATE_BOOK,
  GET_BOOK_DETAIL,
  DELETE_BOOK,
};

export default books;
