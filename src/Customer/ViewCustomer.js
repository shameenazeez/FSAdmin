import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Button,Modal,Box } from '@mui/material';
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { searchcontext, showcontext } from '../sidebar';

function ViewCustomer() {
  const [customerdata,setCustomerData]=useState([])
  const [CustomerName,setCustomerName]=useState()
  const [Address,setAddress]=useState("")
  const [Product,setProduct]=useState("")
  const [Village,setVillage]=useState("")
  const [District,setDistrict]=useState("")
  const [State,setState]=useState("")
  const [delModal,setdelModal]=useState(false)
  const [_id,setId]=useState("")
  const [show,setShow]=useContext(showcontext)
  const [search,setSearch]=useContext(searchcontext)
  const navigate=useNavigate()
  
  useEffect(() => {
    setShow(true)
    const user= localStorage.getItem("user")
    if(!user){
      navigate('/login')
      setShow(false)
    }
  }, [])
   
  axios.get('http://localhost:5000/api/getcustomer').then((res)=>{
    setCustomerData(res.data)})
    
    const deletesale =(_id)=>{
  
      axios.delete(`http://localhost:5000/api/deletecustomer/${_id}`).then((res)=>{
        console.log(res.data)
        console.log(res.data.aknwoledged);
       })
        setdelModal(false)
      
        
    }

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 600,
      
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    const delModalOpen=()=>{
      setdelModal(true)  
    }
    
    const delModalClose=()=>{
      setdelModal(false)
    }

    const searching=customerdata.filter((data)=>data.CustomerName.includes(search))
  return (
    <div>
        
       <Table striped bordered hover>
        <>
    
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Address</th>
          <th>Product</th>
          <th>Village</th>
          <th>District</th>
          <th>State</th>
          <th colSpan={"2"}>Action</th>
        </tr>
      </thead>
     
      {searching?.map((cdata,index)=>
         <tbody>
        <tr>
          
          <td>{cdata.CustomerName}</td>
          <td>{cdata.Address}</td>
          <td>{cdata.Product}</td>
          <td>{cdata.Village}</td>
          <td>{cdata.District}</td>
          <td>{cdata.State}</td>
        <Link to={`/editcustomer/${index}` }><td><EditIcon/> </td></Link> 
          <td onClick={()=>{
            setId(cdata._id)
            delModalOpen()
          }}><DeleteIcon/> </td>
        </tr>
        </tbody>
      )}
        
     
 
         </>
    </Table>
    <div>
      

      <Modal
          open={delModal}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{height:"auto"}}
        >
          <Box sx={style}>
          Are you sure you want to delete?
      
    <Button onClick={()=>deletesale(_id)} >yes</Button>
    <Button onClick={delModalClose}>no</Button>
           
          </Box>
        </Modal>
      </div>
    </div>
  )
}

export default ViewCustomer