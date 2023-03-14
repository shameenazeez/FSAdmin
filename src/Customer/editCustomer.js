import React, { useState,useEffect, useContext } from 'react'
import { Box,TextField,Button } from '@mui/material'
import {Container,Form} from 'react-bootstrap'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


function EditCustomer() {
  const [CustomerData,setCustomerData]=useState([])
  const [CustomerName,setCustomerName]=useState(CustomerData.CustomerName)
  const [Address,setAddress]=useState(CustomerData.Address)
  const [Product,setProduct]=useState(CustomerData.Product)
  const [Village,setVillage]=useState(CustomerData.Village)
  const [District,setDistrict]=useState(CustomerData.District)
  const [State,setState]=useState(CustomerData.State)
  const [_id,setId]=useState("")
  const navigate=useNavigate();
  
  
  const {id}=useParams()
  console.log(id);
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/getcustomer').then((res)=>{
    setCustomerData(res.data[id])
    setId(CustomerData._id)
   })
   
  console.log(CustomerData);
  })
  const updatesale =()=>{
   
    axios.put("http://localhost:5000/api/updatecustomer",{_id, CustomerName,
    Address,
    Product,
    Village,
    District,
    State}).then((res)=>{
  
     })
navigate(-1)
    }
   




  
  return (
    <div>
   
   <Container>
      <Form>
        <Form.Group controlId="formName">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Customer name"  defaultValue={CustomerData.CustomerName} onChange={(e)=>setCustomerName(e.target.value)}/>
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter Address"  defaultValue={CustomerData.Address}  onChange={(e)=>setAddress(e.target.value) }/>
            <Form.Label>Product</Form.Label>
            <Form.Control type="text" placeholder="Enter product"  defaultValue={CustomerData.Product} onChange={(e)=>setProduct(e.target.value)}/>
            <Form.Label>Village</Form.Label>
            <Form.Control type="text" placeholder="Enter village"  defaultValue={CustomerData.Village} onChange={(e)=>setVillage(e.target.value)}/>
            <Form.Label>District</Form.Label>
            <Form.Control type="text" placeholder="Enter district"  defaultValue={CustomerData.District}  onChange={(e)=>setDistrict(e.target.value) }/>
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="Enter state"  defaultValue={CustomerData.State} onChange={(e)=>setState(e.target.value)}/>
        </Form.Group>
      </Form>
      <Button onClick={()=>{
updatesale()
}
}>Save Changes</Button>
    </Container>
     
    </div>
  )
}

export default EditCustomer