import React, { useEffect } from "react";
import { Nav, Navbar, Container, Button, NavDropdown } from "react-bootstrap";
import { useLogoutUserMutation } from "../services/appApi";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  Bounce } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';

const  Navigation =()=> {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate()
    const [logoutUser] = useLogoutUserMutation();
    async function handleLogout(e) {
        e.preventDefault();
        await logoutUser(user);
        // redirect to home page
        console.log(localStorage.getItem("persist:root"))
        await localStorage.removeItem("persist:root")
        console.log(localStorage.getItem("persist:root"))

        navigate("/login");
    }


useEffect(() => {

if(!user){
    navigate("/login");
}

}, [])



    return (
        <>
        { user && <>

        <Navbar style={{backgroundColor:"rgb(64, 218, 182)"}} expand="lg">
            <Container>
                        <img src={logo} style={{ width: 100, height: 80 }} />
                       <h5 style={{backgroundColor:"transparent"}} >Novo Chat</h5> 
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
               
                        {user && (
                            <NavDropdown
                                title={
                                    <>
                                        <img src={user.picture} style={{ width: 30, height: 30, marginRight: 10, objectFit: "cover", borderRadius: "50%" }} />
                                       <span style={{color:"white"}}> {user.name}</span>
                                    </>
                                }
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item >{`${user.email}`}</NavDropdown.Item>

                                <NavDropdown.Item>
                                    <Button variant="danger" onClick={handleLogout}>
                                        Logout 🙋‍♂️
                                    </Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

  
        </>
        
        }
        </>
    );
}

export default Navigation;
