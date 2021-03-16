import React from "react";
import "./EventSection.css"
import Card from "react-bootstrap/Card";

const Event = ({ name, id, url }) => {
    return (
      // <a href="#" className='event-frame box zone'>
      //   <div>
      //     <img className="event-img" src={url} alt="event-pic" />
      //   </div>
      //   <div>
      //     <div className="event-name">
      //         <h2>{name}</h2> 
            
      //     </div>
      //     <div className="event-info">
      //         <p>ID: {id}</p>
      //     </div>
      //   </div>
      // </a>
      <Card className="box" >
      <Card.Img className="event-img" variant="top" src={url} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {id}
        </Card.Text>
      </Card.Body>
    </Card>
    );
  }

export default Event;