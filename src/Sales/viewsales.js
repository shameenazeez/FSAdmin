import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {TableContainer,Table,TableHead,TableRow,TableCell,TableBody,Paper, Button,Modal,Box,Typography, Input} from '@mui/material'
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { datacontext, idcontext, searchcontext, showcontext } from '../sidebar';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '../pagination';



function Sales() {
  
  const [data,setData]=useContext(datacontext)
  const [open,setOpen]=useState(false)
  const [delModal,setdelModal]=useState(false)
  const [search,setSearch]=useContext(searchcontext)
  /*****pagination start***** */
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(3);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord,  indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage)
  /**********pagination end  ******/
  const [_id,setId]=useContext(idcontext)
  const [show,setShow]=useContext(showcontext)
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

   
  const deletesale =(_id)=>{
  
    axios.delete(`http://localhost:5000/api/deletesale/${_id}`).then((res)=>{
      console.log(res.data)
      console.log(res.data.aknwoledged);
     })
      setdelModal(false)
    

  }
  console.log(data);
 
 const searching= currentRecords.filter ((data)=> data.SaleName.includes(search))
 console.log(searching);
 
  return (
    <div>
    
       <TableContainer component={Paper} style={{alignItems:"center"}}>
       <Table sx={{ minWidth: 650 }} aria-label="simple table">
         <TableHead>
           
             <TableCell align="right">SaleName</TableCell>
             <TableCell align="right">District</TableCell>
             <TableCell align="right">State</TableCell>
             <TableCell align="right">Location</TableCell>
           
           
           
         </TableHead>
        
         {searching?.map((datas,index)=>

         <>
         
          <TableBody>
             <TableRow>
           
               <TableCell align="right">{datas.SaleName}</TableCell>
               <TableCell align="right">{datas.District}</TableCell>
               <TableCell align="right">{datas.State}</TableCell>
               <TableCell align="right">{datas.Location}</TableCell>
              

            <Link to={`/edit/${index}`} > <TableCell align="right"> {<EditIcon/>} </TableCell></Link> 

            
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
     <Pagination  nPages={nPages} setCurrentPage={setCurrentPage}/>
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

export default Sales