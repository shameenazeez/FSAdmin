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
import { datacontext, showcontext } from '../sidebar'
  

function Createsale() {
    
    const [data,setData]=useContext(datacontext)
    const [SaleName,setSaleName]=useState("")
    const [District,setDistrict]=useState("")
    const [State,setState]=useState("")
    const [Location,setLocation]=useState("")
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

    axios.post('http://localhost:5000/api/createsale',{SaleName,District,State,Location})
        
      
    navigate(-1);
    
}
  
  return (

    <div  >
         
    <MDBContainer fluid className='d-flex align-items-center justify-content-center '  >
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          {/* <h2 className="text-uppercase text-center mb-5">Hello</h2> */}
     
         
          <MDBInput wrapperClass='mb-4' label='Sales Name' size='lg' id='form2' type='text' onChange={(e)=>{setSaleName(e.target.value);console.log(e.target.value);}}/>
          <MDBInput wrapperClass='mb-4' label='District' size='lg' id='form3' type='text'  onChange={(e)=>{setDistrict(e.target.value);console.log(e.target.value);}}/>
          <MDBInput wrapperClass='mb-4' label='State' size='lg' id='form2' type='text' onChange={(e)=>{setState(e.target.value);console.log(e.target.value);}}/>
          <MDBInput wrapperClass='mb-4' label='Location' size='lg' id='form3' type='text'  onChange={(e)=>{setLocation(e.target.value);console.log(e.target.value);}}/>
          
         
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={submit}>Create Sale</MDBBtn>
        
        </MDBCardBody>
        
      </MDBCard>
    </MDBContainer>
    </div>
  )
}

export default Createsale