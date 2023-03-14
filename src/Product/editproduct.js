import React, { useState,useEffect, useContext } from 'react'
import { Box,TextField,Button } from '@mui/material'
import {Container,Form} from 'react-bootstrap'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


function EditProduct() {
    const [productdata,setProductdata]=useState([])
    const [ProductName,setProductName]=useState(productdata.ProductName)
    const [Category,setCategory]=useState(productdata.Category)
    const [Description,setDescription]=useState(productdata.Description)
    const [Price,setPrice]=useState(productdata.Price)
    const [Availability,setAvailability]=useState(productdata.Availability)
    const [_id,setId]=useState("")
    const navigate=useNavigate();
  
  
  const {id}=useParams()
  console.log(id);
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/getproduct').then((res)=>{
   setProductdata(res.data[id])
    setId(productdata._id)
   })
   
  console.log(productdata);
  })
  const update =()=>{
   
    axios.put("http://localhost:5000/api/updateproduct",{_id,
    ProductName,
    Category,
    Description,
    Price ,
    Availability}).then((res)=>{
  
     })
navigate(-1)
    }
   




  
  return (
    <div>
   
   <Container>
      <Form>
        <Form.Group controlId="formName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" placeholder="Product name"  defaultValue={productdata.ProductName} onChange={(e)=>setProductdata(e.target.value)}/>
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" placeholder="Category"  defaultValue={productdata.Category} onChange={(e)=>setCategory(e.target.value)}/>
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Description"  defaultValue={productdata.Description}  onChange={(e)=>setDescription(e.target.value) }/>
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" placeholder="price"  defaultValue={productdata.Price} onChange={(e)=>setPrice(e.target.value)}/>
            <Form.Label>Availability</Form.Label>
            <Form.Control type="text" placeholder="Availbility"  defaultValue={productdata.Availability} onChange={(e)=>setAvailability(e.target.value)}/>
           
        </Form.Group>
      </Form>
      <Button onClick={()=>{
update()
}
}>Save Changes</Button>
    </Container>
     
    </div>
  )
}

export default EditProduct