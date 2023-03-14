import React, { createContext, useState,useEffect } from 'react'
import { NavDropdown,Navbar,Nav,Container,Form } from 'react-bootstrap';
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Button,Toolbar,IconButton,Box,AppBar,Typography, TextField, FormControl,InputLabel, Select } from '@mui/material';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Home from './home';
import { Route, Routes } from 'react-router-dom';
import Sales from './Sales/viewsales';
import Login from './login';
import Signup from './signup';
import Mainsales from './Sales/sales';
import Createsale from './Sales/createsale';
import Editsale from './Sales/edit';
import ViewCustomer from './Customer/ViewCustomer';
import CreateCustomer from './Customer/CreateCustomer';
import EditCustomer from './Customer/editCustomer';
import ViewProduct from './Product/ViewProduct';
import CreateProduct from './Product/CreateProduct';
import EditProduct from './Product/editproduct';
import ViewClient from './Client/ViewClient';
import CreateClient from './Client/CreateClient';
import EditClient from './Client/EditClient';



const idcontext=createContext()
const datacontext=createContext()
const showcontext=createContext()
const searchcontext=createContext()





function Sidenavbar() {

    const { collapseSidebar } = useProSidebar();
    const [home,setHome]=useState(false)
    const [show,setShow]=useState(false)
    const [_id,setId]=useState("")
    const [data,setData]=useState([])
    const [search,setSearch]=useState("")
    useEffect(() => {
      axios.get('http://localhost:5000/api/getsale').then(res=>{
      
      setData(res.data)
    })
    
    })

 
  return (
    
 <>
 
<div id="app" style={({ height: "100vh" }, { display: "flex" })}>
{show?<>

      <Sidebar style={{ height: "100vh" }}>
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}
          >
            {" "}
            <h2>Admin</h2>
          </MenuItem>
       
          <Link to='/home'> <MenuItem icon={<HomeOutlinedIcon/>}  >Home </MenuItem></Link>
        <MenuItem icon={<PeopleOutlinedIcon/>}>
                    {/* <FormControl fullWidth  > */}
   <Select value={1} placeholder={"Sales"} variant="standard" label="sales">
   <MenuItem value={1} href='/viewsales'>View Sale</MenuItem> 
   <MenuItem value={2} href='/createsales'>Create Sale</MenuItem> 
  </Select>
{/* </FormControl> */}
            </MenuItem>
  
      
          <MenuItem icon={<HelpOutlineOutlinedIcon />}> 
          <Select value={1} variant="standard">
         <MenuItem value={1} href="/viewcustomer">View Customer</MenuItem> 
        <MenuItem value={2} href='/createcustomer'>Create Customer</MenuItem>
   
    </Select>
            
          </MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />} href='/viewproduct'>Product</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />} href='/createproduct'>Add Product</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />} href='/viewclient'>Client</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />} href='/createclient'>Add Client</MenuItem>
        </Menu>
       
      </Sidebar>
      </>:"" }
 
      <main className='content'>
     
      <Navbar bg="grey" expand="lg" >
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>setSearch(e.target.value)}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  
        <>
       <idcontext.Provider value={[_id,setId]}>
       <datacontext.Provider value={[data,setData]}>
       <showcontext.Provider value={[show,setShow]}>
       <searchcontext.Provider value={[search,setSearch]}>

      <Routes>
     
      <Route path='/' element={<Signup/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/viewsales' element={<Sales/>}></Route>
      <Route path='/createsales' element={<Createsale/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/edit/:id' element={<Editsale/>}></Route>
      <Route path='/viewcustomer' element={<ViewCustomer/>}></Route>
      <Route path='/createcustomer' element={<CreateCustomer/>}></Route>
      <Route path='/editcustomer/:id' element={<EditCustomer/>}></Route>
      <Route path='/viewproduct' element={<ViewProduct/>}></Route>
      <Route path='/createproduct' element={<CreateProduct/>}></Route>
      <Route path='/editproduct/:id' element={<EditProduct/>}></Route>
      <Route path='/viewclient' element={<ViewClient/>}></Route>
      <Route path='/createclient' element={<CreateClient/>}></Route>
      <Route path='/editclient/:id' element={<EditClient/>}></Route>



      </Routes>
      </searchcontext.Provider>
      </showcontext.Provider>
      </datacontext.Provider>
      </idcontext.Provider>
      </>
      </main>
      
    </div>
    </>
  )
}

export default Sidenavbar
export {idcontext,datacontext,showcontext,searchcontext}