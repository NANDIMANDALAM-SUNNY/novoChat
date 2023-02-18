import React, { useState } from "react";
import { useSignupUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import profile from "../assets/profile.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  Bounce } from 'react-toastify';
import { Spinner } from "react-bootstrap";



const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [signupUser, { isLoading, error }] = useSignupUserMutation();
    const navigate = useNavigate();
    //image upload states
    const [image, setImage] = useState(null);
    const [upladingImg, setUploadingImg] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    function validateImg(e) {
        const file = e.target.files[0];
        if (file.size >= 1048576) {
            return toast.warn('Please upload less than 1Mb 😣😣😣!', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: true,
              });
              
        } else {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    async function uploadImage() {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "unme-chatapp");
        try {
            setUploadingImg(true);
            let res = await fetch("https://api.cloudinary.com/v1_1/dvuqiruzf/image/upload", {
                method: "post",
                body: data,
            });
            const urlData = await res.json();
            setUploadingImg(false);
            return urlData.url;
        } catch (error) {
            setUploadingImg(false);
            toast.error('Something went wrong😭', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: true,
              });
              
        }
    }


 const  handleSignup =async(e)=> {
        e.preventDefault();
        if (!image) return toast.warn('Please upload profile picture 😅!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: true,
          });
          
        else if( !name) return toast.warn('Please enter your name 😅!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: true,
          });
          
        else if( !email) return toast.warn('Please Enter your email 😅!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: true,
          });
          
        else if( !password) return toast.warn('Oops! You forgot to fill password 😅!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: true,
          });
          
        const url = await uploadImage(image);
        signupUser({ name, email, password, picture: url }).then(({ data }) => {
            if (data) {
                navigate("/login");
            }
        });
    }

    if(error){
      toast.error('Already used this email 😡', {
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

        <div className="mt-4">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card text-white  custom-card" style={{backgroundColor:"rgb(64, 218, 182"}}>
                <div className="card-body p-5 text-center">
                  <div className="mb-md-3 mt-md-2 pb-5">
                    <h2 className="fw-bold mb-3 text-uppercase">Create Account</h2>
                    <div className="signup-profile-pic__container">
                            <label htmlFor="image-upload" className="image-upload-label">
                            <img src={imagePreview || profile} className="signup-profile-pic" />
                                <i className="fas fa-plus-circle add-picture-icon"></i>
                            </label>
                            <input type="file"  id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
                        </div>
                    <div className="mb-1">
                        <input type="email"  placeholder="Your name" onChange={(e) => setName(e.target.value)} value={name}  className="form-control " />
                        <label className="form-label" >Name</label>
                      </div>
                    <div className="mb-1">
                        <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email}  className="form-control " />
                        <label className="form-label" >Email</label>
                      </div>
                    <div className="mb-1">
                      <input type="password" id="password" name="password"  onChange={(e) => setPassword(e.target.value)} value={password} className="form-control " />
                      <label className="form-label">Password</label>
                    </div>
                    <button className="btn btn-outline-light btn-lg px-5"  id="btn-submit"  onClick={handleSignup}>
                    {upladingImg || isLoading ? <Spinner animation="grow" /> : "Signup"}
                    </button>
                  </div>
                  <div className="py-4">
                            <p className="text-center">
                                Already have an account ? <Link to="/login">Login</Link>
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
    );
}

export default Signup;
