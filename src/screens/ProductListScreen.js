import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

function ProductListScreen() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  let location = useLocation()
  let keyword = location.search

  const productList = useSelector(state => state.productList)
  const { loading, error, products, pages, page } = productList

  const productDelete = useSelector(state => state.productDelete)
  const { loading:loadingDelete, error:errorDelete, success:successDelete  } = productDelete

  const productCreate = useSelector(state => state.productCreate)
  const { loading: loadingCreate, error: errorCreate, 
        success: successCreate, product: createdProduct } = productCreate

  const userLogin= useSelector(state => state.userLogin)
  const { userInfo } = userLogin

   useEffect(()=>{
    dispatch({type: PRODUCT_CREATE_RESET })

    if(!userInfo.isAdmin){
      navigate('/')
    }
    if(successCreate){
      navigate(`/admin/product/${createdProduct._id}/edit`)
    }else{
      dispatch(listProducts(keyword))
    }
      
   }, [dispatch, userInfo, navigate, successDelete, createdProduct, successCreate, keyword])

   const deleteHandler = (id) => {
    if(window.confirm('Are you sure you want to delete this product?')){
      dispatch(deleteProduct(id))
    }   
   }

   const createProductHandler = (product) =>{
      dispatch(createProduct({}))
   }

  return (
    <div>
    <Row className='align-items-center'>
        <Col>
            <h1>Products</h1>
        </Col>
        <Col className='text-right'>
            <Button className='my-3' onClick={createProductHandler} disabled>
                <i className='fas fa-plus'></i> Create Product
            </Button>
        </Col>
    </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message> }

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message> }

      {loading 
        ? (<Loader/> ) 
        : error ? (<Message variant='danger'>{error}</Message>) 
        : (<div>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map(products => (
                  <tr key={products._id}>
                    <td>{products._id}</td>
                    <td>{products.name}</td>
                    <td>{products.price}</td>
                    <td>{products.category}</td>
                    <td>{products.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/products/${products._id}/edit`} >
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      
                      <Button variant='danger' className='btn-sm' onClick={()=> deleteHandler(products._id)}>
                          <i className='fas fa-trash'></i>
                        </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Paginate pages={pages} page={page} isAdmin={true} />
          </div>
        ) }
    </div>
  )
}


export default ProductListScreen