// import React, { useContext, useState } from "react";
// import { Col, Container, Form, Row, Button, Spinner } from "react-bootstrap";
// import { useLoginUserMutation } from "../services/appApi";
// import { Link, useNavigate } from "react-router-dom";
// import "./Login.css";
// import { AppContext } from "../context/appContext";
// import Logo from '../assets/logo1.png'


// function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();
//     const { socket } = useContext(AppContext);
//     const [loginUser, { isLoading, error }] = useLoginUserMutation();
//     const handleLogin = (e) => {
//         e.preventDefault();
//         loginUser({ email, password }).then(({ data }) => {
//             if (data) {
//                 socket.emit("new-user");
//                 navigate("/chat");
//             }
//         });
//     }

//     return (
//         <Container>
//             <Row>
//                 <Col md={2} className=""></Col>
//                 <Col md={8} className="d-flex align-items-center justify-content-center flex-direction-column loginContainer">
//                     <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleLogin}>
//                 <img src={Logo}  style={{maxWidth:"100%"}} />
//                         <Form.Group className="mb-3" controlId="formBasicEmail">
//                             {error && <p className="alert alert-danger">{error.data}</p>}
//                             <Form.Label>Email address</Form.Label>
//                             <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required />
//                         </Form.Group>

//                         <Form.Group className="mb-3" controlId="formBasicPassword">
//                             <Form.Label>Password</Form.Label>
//                             <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
//                         </Form.Group>
//                         <Button variant="primary" type="submit">
//                             {isLoading ? <Spinner animation="grow" /> : "Login"}
//                         </Button>
//                         <div className="py-4">
//                             <p className="text-center">
//                                 Don't have an account ? <Link to="/signup">Signup</Link>
//                             </p>
//                         </div>
//                     </Form>
//                 </Col>
//                 <Col md={2} className="login__bg"></Col>
//             </Row>
//         </Container>
//     );
// }

// export default Login;

import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom'
import { useLoginUserMutation } from "../services/appApi";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { AppContext } from "../context/appContext";
import { Spinner } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  Bounce } from 'react-toastify';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { socket } = useContext(AppContext);
    const [loginUser, { isLoading, error }] = useLoginUserMutation();
    const handleLogin = (e) => {
        e.preventDefault();
        loginUser({email, password }).then(({ data }) => {
            if (data) {
                socket.emit("new-user");
                navigate("/");
            }
        });
    }
    if(error){
      toast.warn('Invalid email or password🥲', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: true,
        });
        
    }

  return (
    <>
          <div style={{marginTop:'30px'}} >
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card text-white  custom-card" style={{backgroundColor:"rgb(64, 218, 182"}}>
                <div className="card-body p-5 text-center">
                  <div className="mb-md-3 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-5 text-uppercase">Login</h2>
                    <div className="mb-1">
                        <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email}  className="form-control " />
                        <p style={{color:"black"}}>login - demoguvi@gmail.com</p>
                        <label className="form-label" >Email</label>
                      </div>
                    <div className="mb-1">
                      <input type="password" id="password" name="password"  onChange={(e) => setPassword(e.target.value)} value={password} className="form-control " />
                      <p style={{color:"black"}}>password - demoguvi@gmail.com</p>

                      <label className="form-label">Password</label>
                    </div>
                    <button className="btn btn-outline-light btn-lg px-5"  id="btn-submit"  onClick={handleLogin}>
                    {isLoading ? <Spinner animation="grow" /> : "Login"}
                    </button>
                  </div>
                  <div>
                    <p className="mb-0">Not having an account? <Link to='/signup'  style={{textDecoration:'none',color:"blue"}} >Signup </Link> here
                    </p>
                  </div>
      
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
    transition={Bounce}
  />
    </>
  )
}

export default Login