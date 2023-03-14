import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {Form,Card,Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { datacontext, showcontext } from '../sidebar'

function CreateCustomer() {

        
    const [productdata,setProductdata]=useState([])
    const [CustomerName,setCustomerName]=useState("")
    const [Address,setAddress]=useState("")
    const [Product,setProduct]=useState("")
    const [Village,setVillage]=useState("")
    const [District,setDistrict]=useState("")
    const [State,setState]=useState("")
    const[value,setValue]=useState("")
    const [show,setShow]=useContext(showcontext)
    
  
  useEffect(() => {
    setShow(true)
    const user= localStorage.getItem("user")
    if(!user){
      navigate('/login')
      setShow(false)
    }
  }, [])

   
    

    // const handlechange=(e)=>{
    //   const {value,checked}=e.target;
      
    //   console.log(`${value} is ${checked}`);
    //   if(checked){
    //     setProduct([...Product,value])
    //   }
    //   else{
    //     setProduct(Product.filter((produc)=> produc !== value))
    //   }
    // }

      // let checkedData=array;
      // checkedData.push(e.target.value)
      // setArray(checkedData)
  
    
      axios.get('http://localhost:5000/api/getproduct').then((res)=>{
        setProductdata(res.data)})

    const navigate=useNavigate()
    const submit=()=>{

    axios.post('http://localhost:5000/api/createcustomer',{CustomerName,Address, Product, Village, District, State}).then((res)=>{
        
         
    })
    navigate(-1);
    
}



  return (
    <div>
      
      <Card style={{ width: '30rem', margin:'2rem', display:'-ms-flexbox'}}>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail"  style={{display:'-ms-inline-grid'}}>
        <Form.Label>Customer Name</Form.Label>
        <Form.Control type="email" placeholder="Enter customer name" onChange={(e)=>setCustomerName(e.target.value)} />
      </Form.Group>
       <Form.Group>
       <Form.Label>Address</Form.Label>
      <textarea
        className="form-control"
        id="exampleFormControlTextarea1"
        rows="4"
        onChange={(e)=>setAddress(e.target.value)}
      />
       </Form.Group>
       <Form.Group className="mt-3 mb-3"  aria-label='product'>
       <h4>Select Products</h4>
      
      
          <div className="dropdown">
             <select value={productdata.ProductName} onChange={(e)=>setProduct(e.target.value)}>
              <option value="select a product">Select a product</option>
             {productdata.map((pro)=>
<option value={pro.ProductName}>{pro.ProductName}</option>

)}
      </select>
          </div>
        
     
         </Form.Group>
       {/* <Form.Group className="mt-3 mb-3"  aria-label='product'>
       <h4>Select Products</h4>
        {productdata.map((pro)=>
      
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                 value={pro.ProductName}
                onChange={(e)=>handlechange(e)}
                className="form-check-input"
              />
              {pro.ProductName}
            </label>
          </div>
          )}
     
         </Form.Group> */}
      <Form.Group className="mb-3" controlId="formBasicText" >
        <Form.Label>Village</Form.Label>
        <Form.Control type="text" placeholder="Enter Village"  onChange={(e)=>setVillage(e.target.value)}/>

      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>District</Form.Label>
        <Form.Control type="text" placeholder="Enter district" onChange={(e)=>setDistrict(e.target.value)}/>

      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>State</Form.Label>
        <Form.Control type="text" placeholder="Enter state" onChange={(e)=>setState(e.target.value)} />

      </Form.Group>
   

      <Button variant="primary" type="submit" onClick={submit}>
        Submit
      </Button>
    </Form>
    </Card>
    </div>
  )
}

export default CreateCustomer