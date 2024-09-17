import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../customAxios/privateAxios";

export const shopProductAction = createAsyncThunk(
  "/products/getAllProduct",
  async ({filterParams, sortParams}) => {
    try{
        const query = new URLSearchParams({
            ...filterParams,
            sortBy: sortParams
        })
        const { data } = await axiosPrivate(`/api/shop/products/get?${query}`);
        
        return data?.Data;
    }catch(err){
        console.log('error from get shop product', err.message);
    }
  }
);

export const getShopProductByIdAction = createAsyncThunk('/product/getproductbyid', async(id)=>{
    try{
        const { data } = await axiosPrivate(`/api/shop/products/get/${id}`);
        console.log(data);
        return data?.Data;
    }catch(err){
        console.log('Error from get Product from id', err.message);
    }
})
