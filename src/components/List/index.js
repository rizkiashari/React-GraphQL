import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { DELETE_BOOK, GET_BOOKS } from "../../config/books";

const List = () => {
  const { loading, error, data } = useQuery(GET_BOOKS, {
    fetchPolicy: "no-cache",
  });
  const [deleteBook, { loading: loadingDelete, error: errorDelete }] =
    useMutation(DELETE_BOOK);

  if (loading || loadingDelete) return <p>Loading...</p>;
  if (error || errorDelete)
    return error?.graphQLErrors.map((error) => error) ?? error.message;
  if (data.getAllBooks.length === 0) {
    return (
      <>
        <p>Belum ada buku daftar</p>
        <Link to='/book/new'>Buat Buku Baru</Link>;
      </>
    );
  }
  const deleteData = (id) => {
    deleteBook();
  };

  return (
    <div>
      <h1>
        List Buku (
        <Link to='/book/new' style={{ fontSize: 12 }}>
          + Buat Baru
        </Link>
        )
      </h1>

      {data.getAllBooks.map((book) => {
        return (
          <div key={book._id}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ marginRight: 10 }}>{book.title}</p>
              <Link
                style={{
                  marginRight: 10,
                  cursor: "pointer",
                }}
                to={`/book/${book._id}/edit`}>
                Edit
              </Link>
              <button type='button' onClick={deleteData(book._id)}>
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
