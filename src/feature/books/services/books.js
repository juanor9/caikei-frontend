/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem('login-token');

export const createBook = createAsyncThunk(
  'books/createBook',
  async (book) => {
    const{userToken, ...bookData} = book
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(bookData),
    };

    if (!token) {
      return { mesage: 'no token available' };
    }
    const res = await fetch(`${BASE_URL}/api/books`, options);
    const result = await res.json();
    return result;
  },
);

export const getBooksByPublisher = createAsyncThunk(
  'books/getBooksByPublisher',
  async (filter) => {
    const {publisher, userToken} = filter
    const uriParams = publisher;
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };
    if (!userToken) {
      return { mesage: 'no token available' };
    }

    const res = await fetch(`${BASE_URL}/api/books/search?publisher=${uriParams}`, options);
    const result = await res.json();
    return result;
  },
);

export const getBooksByFilter = createAsyncThunk(
  'books/getBooksByPublisher',
  async (data) => {
    const {bookFilter, userToken} = data;
    // console.log(bookFilter);
    const uriParams = new URLSearchParams();
    Object.keys(bookFilter).forEach(key => {
      const value = bookFilter[key];
      uriParams.append(key, value);
    })
    const uri = `?${uriParams.toString()}`;

    // console.log('uri', uri);
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };
    if (!userToken) {
      return { mesage: 'no token available' };
    }

    const res = await fetch(`${BASE_URL}/api/books/search${uri}`, options);
    const result = await res.json();
    return result;
  },
);

export const getBookById = createAsyncThunk(
  'books/getBookById',
  async (data) => {
    const { id, userToken } = data;
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };
    const res = await fetch(`${BASE_URL}/api/books/${id}`, options);
    const result = await res.json();
    return result;
  },
);

export const updateBookById = createAsyncThunk(
  'books/updateBook',
  async (data) => {
    const { form, id } = data;
    const options = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    };

    const res = await fetch(`${BASE_URL}/api/books/${id}`, options);
    const result = await res.json();
    return result;
  },
);
