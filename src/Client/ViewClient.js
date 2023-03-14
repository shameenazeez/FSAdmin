import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {TableContainer,Table,TableHead,TableRow,TableCell,TableBody,Paper, Button,Modal,Box,Typography, Input} from '@mui/material'
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { searchcontext, showcontext } from '../sidebar';



function ViewClient() {
  
  const [ClientData,setClientData]=useState([])
  const [open,setOpen]=useState(false)
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

  const handleOpen=(id)=>{
    setOpen(true)
  
  }
  const handleClose=(id)=>{
    setOpen(false)
  
  }

  const delModalOpen=()=>{
  setdelModal(true)  
}

const delModalClose=()=>{
  setdelModal(false)
}



  
  const edit=(index)=>{
   
  }

     
  axios.get('http://localhost:5000/api/getclient').then((res)=>{
    setClientData(res.data)})
   
  const deletesale =(_id)=>{
  
    axios.delete(`http://localhost:5000/api/deleteclient/${_id}`).then((res)=>{
      console.log(res.data)
      console.log(res.data.aknwoledged);
     })
      setdelModal(false)
    
      
  }
//   console.log(data);
 
 const searching= ClientData.filter ((data)=> data.ClientName.includes(search))
 console.log(searching);
 
  return (
    <div>
       
       <TableContainer component={Paper} style={{alignItems:"center"}}>
       <Table sx={{ minWidth: 650 }} aria-label="simple table">
         <TableHead>
           
             <TableCell align="right">Client Name</TableCell>
             <TableCell align="right">Role</TableCell>
             <TableCell align="right">Email</TableCell>
             <TableCell align="right">Signin Status</TableCell>
             <TableCell align="right">Contact</TableCell>
           
           
           
         </TableHead>
        
         {searching?.map((datas,index)=>

         <>
         
          <TableBody>
             <TableRow>
           
               <TableCell align="right">{datas.ClientName}</TableCell>
               <TableCell align="right">{datas.Role}</TableCell>
               <TableCell align="right">{datas.Email}</TableCell>
               <TableCell align="right">{datas.SigninStatus?"true":"false"}</TableCell>
               <TableCell align="right">{datas.Contact}</TableCell>

            <Link to={`/editclient/${index}`} > <TableCell align="right"> {<EditIcon/>} </TableCell></Link> 

            
             <TableCell align="right" onClick={()=>{
   setId(datas._id)
   delModalOpen()
 }}> 
               {<DeleteIcon/>}
             </TableCell>
               
             
          
             </TableRow>
             </TableBody>
          
           </>
  )}
        
       </Table>
     </TableContainer>
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

export default ViewClient