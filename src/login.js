
import React, { useContext, useEffect, useState } from 'react'
import {Alert} from '@mui/material'

import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
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
import { showcontext } from './sidebar'




function Login() {

    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const [passwordIncorrect,setPasswordIncorrect]= useState(false)
    const [show,setShow]=useContext(showcontext)


    const navigate=useNavigate()
  

    const submit=()=>{
        axios.post('http://localhost:5000/api/login',{email,password}).then((res)=>{
            const isError=res.data.isError
            if(isError){
                setPasswordIncorrect(true)
            }
            else{
                localStorage.setItem("user",JSON.stringify(res.data))
               navigate('/home')
            }
        })
    }
    useEffect(() => {
      const user= localStorage.getItem("user");
      
       if(user)
       navigate('/home')
       else
       navigate('/login')
       
      }, [])
  return (
    <div>
     
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' >
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Hello</h2>
      <div className='alertbox'> {passwordIncorrect? <Alert severity="error">Incorrect Password or Email</Alert>:""}</div> 
         
          <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email' onChange={(e)=>{setEmail(e.target.value);console.log(e.target.value);}}/>
          <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password'  onChange={(e)=>{setPassword(e.target.value);console.log(e.target.value);}}/>
          {/* <MDBInput wrapperClass='mb-4' label='Repeat your password' size='lg' id='form4' type='password' /> */}
          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={submit}>Login</MDBBtn>
          <div className='loginlink'>Don't have an account?<Link to={'/'}>Create an Account</Link></div>
        </MDBCardBody>
        
      </MDBCard>
    </MDBContainer>

 

</div>

  )
}

export default Login