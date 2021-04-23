/**
 * @file Chat.js - The source code of the chat room client side component.
 * @author Eric Lin
 * 
 */   

import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle} from "react";
import io from "socket.io-client";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Messages from '../Messages/Messages';
import Input from '../Input/Input';
import { useHistory } from "react-router-dom";

import './Chat.css';

const ENDPOINT = 'http://localhost:8000/';
let socket;

const Chat = forwardRef((props, ref) =>{
  let history = useHistory();
  let currentUsername = localStorage.getItem('user');;
  if(currentUsername===null)
  {
  }
  const roomstring = "liveart"+props.roomid.toString();
  const [name, setName] = useState(currentUsername);
  const [room, setRoom] = useState(roomstring);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    socket = io(ENDPOINT , {transports: ['websocket', 'polling', 'flashsocket']});

    setRoom(roomstring);
    setName(currentUsername);
    console.log(name,room);

    socket.emit('join', { name, room }, (error) => {
      console.log("join1");
        if(error) {
          history.go(0);

        }
      });
    

  },[ENDPOINT, name, room]);


  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

    /**
     * @method sendMessage 
     * @description send the message to the server
     * @param {event} - event
     * @returns {null} - none
     */
  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }



  useImperativeHandle(ref, () => ({

    /**
     * boardCastMessage
     * @param {string} systemNotification - First number
     * @returns {null} - none
     */
    boardCastMessage(systemNotification){
      //event.preventDefault();
      if(systemNotification) {
        socket.emit('sendMessage', systemNotification, () => setMessage(''));
      }
    }
  }));

  return (
    <div>
    <div className="chat-overall">
      <div className="chat-count">
        <Button className="btn btn-info btn-sm" onClick={handleShow}> Current Audience in this Auction: {users.length} </Button>
      </div>
    
    <div className="chat-outerContainer">
      
      <div className="chat-container">
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
    </div>


    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Audience in this auction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {
          users.map((user,index) =>{
            return(
              <li>{user.name}</li>
            );
          })
          
        }

        </Modal.Body>
      </Modal>
        </div>
  );
})


export default Chat;
