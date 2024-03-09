import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (token) => {
    const response = await fetch("https://reileadsapi.exerboost.in/upkeep/app/landlord/fetch/all-property", {
      headers: {
        Authorization: ` ${token}` // Include the token in the Authorization header
      }
    });
    const data = await response.json();
    return data.result;
  }
);

export const deleteProperty = createAsyncThunk(
  "posts/deleteProperty",
  async ({ token, propertyId }) => {
    const response = await fetch(`https://reileadsapi.exerboost.in/upkeep/app/landlord/delete/property/${propertyId}`, {
      method: 'DELETE',
      headers: {
        Authorization: ` ${token}`
      }
    });
    const data = await response.json();
    return data; // You can handle the response as needed
  }
);


export const createProperty = createAsyncThunk(
  "posts/createProperty",
  async ({ token, propertyData }) => {
    // console.log(propertyData)

    const formData = new FormData();

    // Append form data fields to the FormData object
    Object.keys(propertyData).forEach(key => {
      formData.append(key, propertyData[key]);
    });

    const response = await fetch("https://reileadsapi.exerboost.in/upkeep/app/landlord/create/property", {
      method: 'POST',
      headers: {
        Authorization: ` ${token}`
      },
      body: formData
    });
    const data = await response.json();
    return data; // You can handle the response as needed
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState: {
    posts: [],
    loading: false, 
  },
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    [getPosts.rejected]: (state) => {
      state.loading = false;
    },
    [deleteProperty.pending]: (state) => {
      state.loading = true;
    },
    [deleteProperty.fulfilled]: (state, action) => {
      state.loading = false;
      // Remove the deleted property from the state
    },
    [deleteProperty.rejected]: (state) => {
      state.loading = false;
    },

    [createProperty.pending]: (state) => {
      state.loading = true;
    },
    [createProperty.fulfilled]: (state, action) => {
      state.loading = false;
      // You can handle the response if needed
    },
    [createProperty.rejected]: (state) => {
      state.loading = false;
      // Handle the rejection if needed
    },
  },
});

export default propertySlice.reducer;
