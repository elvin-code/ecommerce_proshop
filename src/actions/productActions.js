import axios from 'axios'
import {
    PRODUCT_LIST_REQUET,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUET,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUET,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUET,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUET,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
 } from '../constants/productConstants'

export const listProducts = () => async (dispatch) => {
    try{
        dispatch({ type: PRODUCT_LIST_REQUET })
        const { data } = await axios.get('/api/products/')
        dispatch({ 
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({ 
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const ListProductDetails = (id) => async (dispatch) => {
    try{
        dispatch({ type: PRODUCT_DETAILS_REQUET })
        const { data } = await axios.get(`/api/products/${id}/`)
        dispatch({ 
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({ 
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getSate) => {
    try{
        dispatch({ type: PRODUCT_DELETE_REQUET })

        const { userLogin: { userInfo } } =  getSate()
        
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/products/delete/${id}`,
            config
        )
        
        dispatch({ 
            type: PRODUCT_DELETE_SUCCESS,
            payload: data
        })

    } catch(error){
        dispatch({ 
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const createProduct = (product) => async (dispatch, getSate) => {
    try{
        dispatch({ type: PRODUCT_CREATE_REQUET })

        const { userLogin: { userInfo } } =  getSate()
        
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        let product = {
            "name": "iphone pro EDIT",
            "price": "1299",
            "brand": "Apple",
            "countInStock": 10,
            "category": "Electronic",
            "description": "New Iphone 2023"
        }

        const { data } = await axios.post(
            `/api/products/create/`,
            product,
            config
        )
        
        dispatch({ 
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })
    
    
    } catch(error){
        dispatch({ 
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const updateProduct = (product) => async (dispatch, getSate) => {
    try{
        dispatch({ type: PRODUCT_UPDATE_REQUET })

        const { userLogin: { userInfo } } =  getSate()
        
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/products/update/${product._id}/`,
            product,
            config
        )
        
        dispatch({ 
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })
        
        dispatch({ 
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    
    } catch(error){
        dispatch({ 
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}