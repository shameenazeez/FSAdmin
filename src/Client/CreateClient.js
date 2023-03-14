import React, { useContext, useState,useEffect } from 'react'
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

  

function CreateClient() {
    
    const [clientdata,setClientdata]=useState([])
    const [ClientName,setClientName]=useState("")
    const [Role,setRole]=useState("")
    const [Email,setEmail]=useState("")
    const [SigninStatus,setSigninStatus]=useState()
    const [Contact,setContact]=useState("")
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

    axios.post('http://localhost:5000/api/createclient',{  ClientName,
    Role,
    Email,
    SigninStatus,   
    Contact})

    navigate(-1);
    }

    const handleradio=(e)=>{
      const { value,checked}=e.target;
      console.log(value);
    if(value == 'signin' && checked){
    setSigninStatus(true)

    }
    else if (value == 'notsignin'&& checked)
    {
      setSigninStatus(false)
    }
    }
  console.log(SigninStatus);
  return (

    <div>
         
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' >
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          {/* <h2 className="text-uppercase text-center mb-5">Hello</h2> */}
     
         
          <MDBInput wrapperClass='mb-4' label='Enter Name' size='lg' id='form2' type='text' onChange={(e)=>{setClientName(e.target.value);console.log(e.target.value);}}/>
  
          <MDBInput wrapperClass='mb-4' label='Email' size='lg' id='form2' type='text' onChange={(e)=>{setEmail(e.target.value);console.log(e.target.value);}}/>
      
           <div class="form-ck"> Signin Status
          <div class="form-check" >
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value='signin' onChange={(e)=>handleradio(e)}/>
            <label class="form-check-label" for="flexRadioDefault1"> Signin </label>
          </div>
         <div class="form-check">
             <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value='notsignin' onChange={(e)=>handleradio(e)} />
            <label class="form-check-label" for="flexRadioDefault2"> Not Signin </label>
         </div>
         </div>
         <div>
          <select className='nav-drop' onChange={(e)=>setRole(e.target.value)} >
           <option value="role">Role</option>
           <option value="Super Admin">Super Admin</option>
           <option value="Read Only Admin">Read Only Admin</option>
         </select>
         </div>
         <MDBInput wrapperClass='mb-4' label='Contact Information' size='lg' id='form2' type='text' onChange={(e)=>{setContact(e.target.value);console.log(e.target.value);}}/>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={submit}>Create Client</MDBBtn>
   
        </MDBCardBody>
        
      </MDBCard>
    </MDBContainer>
    </div>
  )
}

export default CreateClient