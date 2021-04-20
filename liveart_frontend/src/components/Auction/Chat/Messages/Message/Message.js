import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <div className="messageGrid">
                <p className="sentText pr-10">{trimmedName}</p>    
                <div className="messageBox backgroundBlue">
                    <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                </div>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageGrid">
                <p className="sentText-others pl-10 ">{user}</p>            
                <div className="messageBox-others backgroundLight">
                    <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                </div>           
            </div>
          </div>
        )
  );
}

export default Message;