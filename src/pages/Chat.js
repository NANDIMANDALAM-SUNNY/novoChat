import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import MessageForm from "../components/MessageForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  Bounce } from 'react-toastify';



const Chat =()=> {
    const user = useSelector((state) => state.user);
    const navigate= useNavigate()
useEffect(()=>{
    if(!user){
        navigate('/login')
    }
   
})


    return (
        <>
        <div style={{ backgroundColor:"rgb(64, 218, 182)",}}>
                <div style={{  marginLeft:"30px", marginRight:"30px",  }}   >
                <Row >
                    <Col md={3} 
                        style={{backgroundColor:"white"}}
                    >
                        <Sidebar />
                    </Col>
                    <Col md={9} >
                        <MessageForm />
                    </Col>
                </Row>
                
            </div>
        </div>
        <ToastContainer
    transition={Bounce}
  />
        </>
    );
}

export default Chat;
