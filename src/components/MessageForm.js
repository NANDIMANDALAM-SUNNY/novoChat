import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/appContext";
import InputEmoji from 'react-input-emoji'
import "./MessageForm.css";
function MessageForm() {
    const [message, setMessage] = useState("");
    const user = useSelector((state) => state.user);

    const navigate = useNavigate()

    const { socket, currentRoom, setMessages, messages, privateMemberMsg } = useContext(AppContext);
    const messageEndRef = useRef(null);
    useEffect(() => {
        scrollToBottom();
        if(!user){
            navigate('/login')
        }
    }, [messages]);

    function getFormattedDate() {
        const date = new Date();
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();

        month = month.length > 1 ? month : "0" + month;
        let day = date.getDate().toString();

        day = day.length > 1 ? day : "0" + day;

        return month + "/" + day + "/" + year;
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    function scrollToBottom() {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    const todayDate = getFormattedDate();

    socket.off("room-messages").on("room-messages", (roomMessages) => {
        setMessages(roomMessages);
    });

    function handleSubmit(e) {
        e.preventDefault();
        console.log(message);
        if (!message) return;
        const today = new Date();
        const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
        const time = today.getHours() + ":" + minutes;
        const roomId = currentRoom;
        socket.emit("message-room", roomId, message, user, time, todayDate);
        setMessage("");
    }


  
      function handleChange (e) {
        setMessage(e)
      }


    return (
        <>
            <div className="messages-output">
                {user && !privateMemberMsg?._id && <div className="conversation-info-group">You are in the {currentRoom} room</div>}
                {user && privateMemberMsg?._id && (
                    <>
                        <div className=" conversation-info">
                            <div>
                            <img src={privateMemberMsg.picture} className="conversation-profile-pic" />  
                            {privateMemberMsg.name}  
                            </div>
                        </div>
                    </>
                )}
                <div style={{
                            backgroundColor:'#ffeecd',
                            borderRadius:"7.5px",
                            width:"100%",
                            paddingTop:"6px",
                            paddingBottom:"2px",
                            marginBottom:"10px"
                }}>
                <p className="text-center"  
                    style={{fontSize:"12.5px",
                            lineHeight:"21px",
                            
                            }}>🔒 Messages are end-to-end encrypted. No one outside of this chat, not even UNME ,can read or listen to them.</p>
                </div>
                {user && 
                    messages.map(({ _id: date, messagesByDate }, idx) => (
                        <div key={idx} >
                            <div className="message-date-indicator text-center"><span className="datespan">{date}</span> </div>
                            {
                                messagesByDate?.map(({ content, time, from: sender }, msgIdx) => (
                                <div className={sender?.email == user?.email ? "message " : "incoming-message"} key={msgIdx}>
                                        {     sender?.email !== user?.email ?  <img src={sender.picture}  style={{ width: 35, height: 35, objectFit: "cover", borderRadius: "50%",marginLeft:"20px" }} alt='profile' /> 
                                        :null
                                        }
                                    <div className={sender?.email == user?.email ? " outgoingmessage" : "message-inner"} key={msgIdx}>                                        
                                            <p className="message-sender">{sender._id == user?._id ? "You" : sender.name}</p>
                                            <p className="message-content" 
                                                style={{fontSize:"14.2px",
                                                        lineHeight:"19px",
                                                        textAlign:"start",
                                                        letterSpacing:"normal",
                                                        marginBottom:0,
                                                        paddingBottom:'5px'
                                                        }} >{content}</p>
                                            <p className="message-timestamp-left" 
                                                style={{fontSize:"11px",
                                                    lineHeight:"19px",
                                                    textAlign:"start",letterSpacing:"normal",
                                                    display:"flex",
                                                    justifyContent:"flex-end",
                                                    marginBottom:0}}
                                                >{time}
                                                </p>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    ))}
                <div ref={messageEndRef} />
            </div>
            <div className="send-message">
            <Form >
                            
                <Row>

                    <Col md={11} style={{paddingRight:'0',marginRight:0}} >
                        <Form.Group>
                            <InputEmoji
                            value={message}
                            onChange={handleChange}
                            cleanOnEnter
                            placeholder="Type a message"
                            
                            />
                        </Form.Group>
                    </Col>
                    <Col md={1} style={{marginRight:'0',marginLeft:'0',paddingLeft:"0",paddingBottom:""}} >
                        <Button variant="primary" onClick={handleSubmit} style={{ width: "100%",paddingTop:"12px", backgroundColor: "orange",paddingBottom:"12px" }} disabled={!user}>
                            <i className="fas fa-paper-plane"></i>
                        </Button>
                    </Col>
                </Row>
            </Form>
            </div>
        </>
    );
}

export default MessageForm;
