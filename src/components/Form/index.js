import React, { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { NEW_BOOK, GET_BOOK_DETAIL, UPDATE_BOOK } from "../../config/books";

import { useMutation, useLazyQuery } from "@apollo/client";

const Form = (props) => {
  const history = useHistory();
  const params = useParams();
  const [newBook, { loading: loadingNewBook, error: errorNewBook }] =
    useMutation(NEW_BOOK);
  const [updateBook, { loading: loadingUpdatBook, error: errorUpdateBook }] =
    useMutation(UPDATE_BOOK);

  const [
    getBookDetail,
    { loading: loadingBook, error: errorBook, data: dataBook },
  ] = useLazyQuery(GET_BOOK_DETAIL, {
    variables: {
      _id: params.id,
    },
  });
  useEffect(() => {
    if (params.id) {
      getBookDetail();
    }
  }, [params.id, getBookDetail]);
  useEffect(() => {
    if (dataBook) {
      const form = document.getElementById("form-book");
      for (let index = 0; index < form.length; index++) {
        const element = form[index];
        if (element.nodeName === "INPUT") {
          element.value = dataBook.getBook[element.name];
        }
      }
    }
  }, [dataBook]);

  if (loadingNewBook) return <p>Loading...</p>;
  if (errorNewBook) return <p>{errorNewBook?.message}(</p>;

  const onSubmit = async (e) => {
    e.preventDefault();
    console.dir(e);
    const payload = {};
    for (let index = 0; index < e.target.length; index++) {
      const element = e.target[index];
      if (element.nodeName === "INPUT") {
        payload[element.name] = element.value;
      }
    }

    if (params.id) {
      try {
        const response = await updateBook({
          variables: {
            ...payload,
            _id: params.id,
            release_year: Number(payload.release_year),
          },
        });
        if (response) {
          console.log("Respon: ", response);
          history.push("/books");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    } else {
      try {
        const response = await newBook({
          variables: {
            ...payload,
            release_year: Number(payload.release_year),
          },
        });
        if (response) {
          console.log("Respon: ", response);
          history.push("/books");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };

  if ((params.id && loadingBook) || loadingUpdatBook) return <p>Loading...</p>;

  if (errorNewBook || errorBook || errorUpdateBook)
    return <p>{errorNewBook?.message}</p>;

  return (
    <div>
      <h1>
        <Link style={{ fontSize: 12 }} to='/books'>{`(<= Back)`}</Link> Form
        Penambahan
      </h1>
      <form id='form-book' style={{ maxWidth: 500 }} onSubmit={onSubmit}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor='title'>Title:</label>
          <input type='text' name='title' id='title' />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor='author'>Author:</label>
          <input type='text' name='author' id='author' />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor='desciption'>Description:</label>
          <input type='text' name='desciption' id='desciption' />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor='release_year'>Release Year:</label>
          <input type='number' name='release_year' id='release_year' />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor='genre'>Genre:</label>
          <input type='text' name='genre' id='genre' />
        </div>
        <button onClick={() => history.push("/books")}>Back</button>
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default Form;
