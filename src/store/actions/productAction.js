import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../customAxios/privateAxios";


const addNewProductAction = createAsyncThunk("/products/addnewproduct", async (formData) => {
    try{

        const {data} = await axiosPrivate.post('/api/admin/products/add-product', formData ,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        return data;
    } catch(err){
        console.log('Error Adding the Product', err);
    }
})

// get all products:-
const getAllProductsAction = createAsyncThunk("/products/getallproduct", async () => {
    try{
        const { data } = await axiosPrivate.get('/api/admin/products/all-product');
        
        return data;
    } catch(err){
        console.log('Error Geting the Products', err);
        return err;
    }
});

// update the products
const updateProductAction = createAsyncThunk("/products/updateproduct", async ({id, formData}) => {
    try{
        console.log('THIS IS ID AND FORMdATA', id, formData);
        const { data } = await axiosPrivate.put(`/api/admin/products/update-product/${id}`, formData ,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        return data;
    } catch(err){
        console.log('Error Adding the Product', err);
    }
})

// delete the product
const deleteProductAction = createAsyncThunk("/products/deleteproduct", async (id) => {
    try{

        const {data} = await axiosPrivate.delete(`/api/admin/products/delete-product/${id}`);
        
        return data;
    } catch(err){
        console.log('Error Adding the Product', err);
    }
});



export {
    addNewProductAction, updateProductAction, getAllProductsAction, deleteProductAction
}