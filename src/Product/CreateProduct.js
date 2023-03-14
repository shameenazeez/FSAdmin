import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
    MDBCheckbox
  } from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom'
import { showcontext } from '../sidebar'

  

function CreateProduct() {
    
    const [productdata,setProductdata]=useState([])
    const [ProductName,setProductName]=useState("")
    const [Category,setCategory]=useState("")
    const [Description,setDescription]=useState("")
    const [Price,setPrice]=useState("")
    const [Availability,setAvailability]=useState("")
    const [show,setShow]=useContext(showcontext)
  
    useEffect(() => {
      setShow(true)
      const user= localStorage.getItem("user")
      if(!user){
        navigate('/login')
        setShow(false)
      }
    }, [])

    const navigate=useNavigate()
    const submit=()=>{

    axios.post('http://localhost:5000/api/createproduct',{ProductName,Category,Description,Price,Availability})
        
      
    navigate(-1);
    
}
  
  return (

    <div>
         
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' >
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          {/* <h2 className="text-uppercase text-center mb-5">Hello</h2> */}
     
         
          <MDBInput wrapperClass='mb-4' label='Product Name' size='lg' id='form2' type='text' onChange={(e)=>{setProductName(e.target.value);console.log(e.target.value);}}/>
          <MDBInput wrapperClass='mb-4' label='Catogory' size='lg' id='form3' type='text'  onChange={(e)=>{setCategory(e.target.value);console.log(e.target.value);}}/>
          <MDBInput wrapperClass='mb-4' label='Description' size='lg' id='form2' type='text' onChange={(e)=>{setDescription(e.target.value);console.log(e.target.value);}}/>
          <MDBInput wrapperClass='mb-4' label='Price' size='lg' id='form3' type='text'  onChange={(e)=>{setPrice(e.target.value);console.log(e.target.value);}}/>
          <MDBInput wrapperClass='mb-4' label='Availability' size='lg' id='form3' type='text'  onChange={(e)=>{setAvailability(e.target.value);console.log(e.target.value);}}/>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={submit}>Create Sale</MDBBtn>
        
        </MDBCardBody>
        
      </MDBCard>
    </MDBContainer>
    </div>
  )
}

export default CreateProduct