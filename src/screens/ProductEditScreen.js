import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { ListProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

function ProductEditScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch('')
  const params = useParams();

  const productId = params.id
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const productDetails = useSelector(state => state.productDetails)
  const { error, loading, product } = productDetails

  const productUpdate = useSelector(state => state.productUpdate)
  const { error:errorUpdate, loading:loadingUpdate, success:successUpdate } = productUpdate

  const userLogin= useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(()=>{
    if(successUpdate){
      dispatch({type: PRODUCT_UPDATE_RESET})
      navigate('/admin/products/')
    }else{

      if(!product.name || product._id !== Number(productId)){
          dispatch(ListProductDetails(productId))
      }else{
          setName(product.name)
          setPrice(product.price)
          setImage(product.image)
          setBrand(product.brand)
          setCategory(product.category)
          setCountInStock(product.countInStock)
          setDescription(product.description)
      }
    }

  }, [productId, product, dispatch, navigate, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProduct({
      name,
      price,
      image,
      brand,
      category,
      description,
      countInStock,
      _id: productId,
    }))
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    formData.append('product_id', productId)
    setUploading(true)
    try{
        const config = {
          headers: {
            'Content-Type':'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`
          }
        }

        const { data } = await axios.post('/api/products/upload/', formData, config)
        setImage(data)
        setUploading(false)
    }catch{
      setUploading(false)
    }
  }

  return (
    <div>
        <Link to='/admin/products'>
            Go Back
        </Link>
        <FormContainer>
        <h1>Product User</h1>

        {loadingUpdate && <Loader /> }
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }

        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>
        : (
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                    <Form.Control
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    >
                </Form.Control>
                </Form.Group>

                <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter Price'
                        value={price}
                        onChange={(e)=> setPrice(e.target.value)}
                        >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter image'
                        value={image}
                        onChange={(e)=> setImage(e.target.value)}
                        >
                    </Form.Control>
                    <Form.Control                    
                      type='file'
                      label='Choose File'
                      custom='true'
                      onChange={uploadFileHandler}
                    >
                    </Form.Control>
                    {
                        uploading && <Loader />
                    }
                </Form.Group>

                <Form.Group controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Brand'
                        value={brand}
                        onChange={(e)=> setBrand(e.target.value)}
                        >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='countinstock'>
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter stock'
                        value={countInStock}
                        onChange={(e)=> setCountInStock(e.target.value)}
                        >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Category'
                        value={category}
                        onChange={(e)=> setCategory(e.target.value)}
                        >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Description'
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}
                        >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
        )}

        </FormContainer>
    </div>
  )
}

export default ProductEditScreen
