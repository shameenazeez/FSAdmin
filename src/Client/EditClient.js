import React, { useState,useEffect, useContext } from 'react'
import { Box,TextField,Button } from '@mui/material'
import {Container,Form} from 'react-bootstrap'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


function EditClient() {
    const [clientdata,setClientdata]=useState([])
    const [ClientName,setClientName]=useState(clientdata.ClientName)
    const [Role,setRole]=useState(clientdata.Role)
    const [Email,setEmail]=useState(clientdata.Email)
    const [SigninStatus,setSigninStatus]=useState(clientdata.SigninStatus)
    const [Contact,setContact]=useState(clientdata.Contact)
  const [_id,setId]=useState("")
  const navigate=useNavigate();
  
  
  const {id}=useParams()
  console.log(id);
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/getclient').then((res)=>{
    setClientdata(res.data[id])
    setId(clientdata._id)
   })
   
  console.log(clientdata);
  })
  const updatesale =()=>{
   
    axios.put("http://localhost:5000/api/updateclient",{_id, ClientName,
    Role,
    Email,
    SigninStatus,   
    Contact}).then((res)=>{
  
     })
navigate(-1)
    }
   




  
  return (
    <div>
   
   <Container>
      <Form>
        <Form.Group controlId="formName">
            <Form.Label>Client Name</Form.Label>
            <Form.Control type="text"   defaultValue={clientdata.ClientName} onChange={(e)=>setClientName(e.target.value)}/>
            <Form.Label>Email</Form.Label>
            <Form.Control type="text"  defaultValue={clientdata.Email}  onChange={(e)=>setEmail(e.target.value) }/>
            <Form.Label>Signin Status</Form.Label>
            <Form.Control type="text"  defaultValue={clientdata.SigninStatus} onChange={(e)=>setSigninStatus(e.target.value)}/>
            <Form.Label>Role</Form.Label>
            <Form.Control type="text"  defaultValue={clientdata.Role} onChange={(e)=>setRole(e.target.value)}/>
            <Form.Label>Contact</Form.Label>
            <Form.Control type="text"   defaultValue={clientdata.Contact}  onChange={(e)=>setContact(e.target.value) }/>
           
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

export default EditClient