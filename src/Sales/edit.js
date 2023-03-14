import React, { useState,useEffect, useContext } from 'react'
import { Box,TextField,Button } from '@mui/material'
import {Container,Form} from 'react-bootstrap'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { idcontext } from '../sidebar'

function Editsale() {
  const [data,setData]=useState([])
  const [SaleName,setSaleName]=useState(data.SaleName)
  const [District,setDistrict]=useState(data.District)
  const [State,setState]=useState(data.State)
  const [Location,setLocation]=useState(data.Location)
  const [_id,setid]=useState("")
  const navigate=useNavigate();
  
  
  const {id}=useParams()
  console.log(id);
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/getsale').then(res=>{
     setData(res.data[id])
     setid(data._id)
   
  })
  console.log(_id);
  })
  const updatesale =()=>{
   
    axios.put("http://localhost:5000/api/updatesale",{_id,SaleName,District,State,Location}).then((res)=>{
  
     })
navigate(-1)
    }
   




  
  return (
    <div>
   
   <Container>
      <Form>
        <Form.Group controlId="formName">
            <Form.Label>Sale Name</Form.Label>
            <Form.Control type="text" placeholder="Enter sale name"  defaultValue={data.SaleName} onChange={(e)=>setSaleName(e.target.value)}/>
            <Form.Label>District</Form.Label>
            <Form.Control type="text" placeholder="Enter district"  defaultValue={data.District}  onChange={(e)=>setDistrict(e.target.value) }/>
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="Enter state"  defaultValue={data.State} onChange={(e)=>setState(e.target.value)}/>
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" placeholder="Enter location"  defaultValue={data.Location} onChange={(e)=>setLocation(e.target.value)}/>
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

export default Editsale