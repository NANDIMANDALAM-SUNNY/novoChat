import React, { useContext, useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import { addNotifications, resetNotifications } from "../features/userSlice";
import "./Sidebar.css";
import Spinner from 'react-bootstrap/Spinner';


function Sidebar() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { socket, setMembers, members, setCurrentRoom, setRooms, privateMemberMsg, rooms, setPrivateMemberMsg, currentRoom } = useContext(AppContext);
    function joinRoom(room, isPublic = true) {
        socket.emit("join-room", room, currentRoom);
        setCurrentRoom(room);

        if (isPublic) {
            setPrivateMemberMsg(null);
        }
        dispatch(resetNotifications(room));
    }

    socket.off("notifications").on("notifications", (room) => {
        if (currentRoom != room) dispatch(addNotifications(room));
    });

    useEffect(() => {
        if (user) {
            setCurrentRoom("Tech");
            getRooms();
            socket.emit("join-room", "Tech");
            socket.emit("new-user");
        }
    }, []);

    socket.off("new-user").on("new-user", (payload) => {
        setMembers(payload);
    });

    function getRooms() {
        fetch("https://novochatbackend.onrender.com/rooms")
            .then((res) => res.json())
            .then((data) => setRooms(data));
    }

    function orderIds(id1, id2) {
        if (id1 > id2) {
            return id1 + "-" + id2;
        } else {
            return id2 + "-" + id1;
        }
    }

    function handlePrivateMemberMsg(member) {
        setPrivateMemberMsg(member);
        const roomId = orderIds(user._id, member._id);
        joinRoom(roomId, false);
    }

    if (!members) {
        return   
        }
    return (
        <>
            <h2>Group Chats</h2>
            <ListGroup>
                {rooms?.map((room, idx) => (
                    <ListGroup.Item key={idx} onClick={() => joinRoom(room)} active={room == currentRoom} style={{ cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
                        {room} {currentRoom !== room && <span className="badge rounded-pill bg-primary">{user?.newMessages[room]}</span>}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <h2 style={{marginTop:"20px"}}>People</h2>
                <div style={{borderTop:"2px solid #f0f2f5",marginTop:"20px"}}></div>
            { members.length !== 0 ?  members?.map((member) => {
               return <>
                <ListGroup.Item key={member?.id} style={{ cursor: "pointer" ,border:'none'}} active={privateMemberMsg?._id == member?._id} onClick={() => handlePrivateMemberMsg(member)} disabled={member?._id === user?._id}>
                    <Row>
                        <Col xs={2} className="member-status">
                            <img src={member?.picture} className="member-status-img" />
                            {member.status == "online" ? <i className="fas fa-circle sidebar-online-status"></i> : <i className="fas fa-circle sidebar-offline-status"></i>}
                        </Col>
                        <Col xs={9} style={{borderTop:"2px solid #f0f2f5",}}>
                            {member?.name}
                            {member?._id === user?._id && " (You)"}
                            {member?.status == "offline" && " (Offline)"}
                        </Col>
                        <Col xs={1}>
                            <span className="badge rounded-pill bg-primary">{user?.newMessages[orderIds(member._id, user._id)]}</span>
                        </Col>
                    </Row>
                </ListGroup.Item>
                </>
            })
            : <div className="spinner" >
            <Spinner  style={{backgroundColor:"rgb(64, 218, 182)",padding:"5%"}} animation="grow"/>
            </div>
            }
        </>
    );
}

export default Sidebar;
