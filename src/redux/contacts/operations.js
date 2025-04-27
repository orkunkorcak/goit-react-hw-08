import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/contacts");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async ({ name, number }, thunkAPI) => {
    try {
      console.log("addContact payload:", { name, number }); // Gönderilen veriyi kontrol et
      const response = await axios.post("/contacts", { name, number }); // name ve number gönderiliyor
      return response.data;
    } catch (e) {
      console.error("addContact error:", e.response?.data || e.message); // Hata mesajını göster
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      console.error("Delete contact error:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
