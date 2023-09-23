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
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUET,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
 } from '../constants/productConstants'

export const productListReducer = (state = {products: []}, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUET:
            return { loading: true, products: []}
        
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload}
        
        case PRODUCT_LIST_FAIL:
            return { loading: false,  error: action.payload }

        default:
            return state
    }
}

export const productDetailsReducer = (state = {product: {reviews:[]}}, action) => {
    switch(action.type){
        case PRODUCT_DETAILS_REQUET:
            return { loading: true, ...state}
        
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload}
        
        case PRODUCT_DETAILS_FAIL:
            return { loading: false,  error: action.payload }
        
        default:
            return state
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_DELETE_REQUET:
            return { loading: true }
        
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }
        
        case PRODUCT_DELETE_FAIL:
            return { loading: false,  error: action.payload }
        
        default:
            return state
    }
}

export const productCreateReducer = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_CREATE_REQUET:
            return { loading: true }
        
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        
        case PRODUCT_CREATE_FAIL:
            return { loading: false,  error: action.payload }
        
        case PRODUCT_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
    switch(action.type){
        case PRODUCT_UPDATE_REQUET:
            return { loading: true }
        
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        
        case PRODUCT_UPDATE_FAIL:
            return { loading: false,  error: action.payload }
        
        case PRODUCT_UPDATE_RESET:
            return { product: {} }

        default:
            return state
    }
}