import React from "react";
import Card from "react-bootstrap/Card";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./ItemCard.css";

const ItemCard = ({ item, itemType }) => {

    if(itemType==="unsold")
    {
      return (
      <Card className="itembox shadow p-2 mb-3 bg-body rounded" >
        <Card.Img className="event-img" variant="top" src={item.ProductURL} />
        <div className="itemcard-body2">
          <Card.Title className="itemtitle">{item.Name}</Card.Title>
          <Card.Text className="itemdescription">
            <ul>
              <li>Description: {item.ProductDescription}</li>
              <li>Base Price: {item.BasePrice}</li>
              <li>Creator: {item.EventHostUsername}</li>
            </ul>
            {/* {id} */}
          </Card.Text>
          <div className="itemtags">
            <ul className="item-tags">
            {
              item.Tags.map((tag, index)=>{
                return(
                  <li>{tag.Name}</li>
                );
              })
            }
            </ul>
          </div>
        </div>
      </Card>
      // </Link>
      );
    }
    else if(itemType==="sold")
    {
      return (
        <Card className="itembox shadow p-2 mb-3 bg-body rounded" >
          <Card.Img className="event-img" variant="top" src={item.ProductURL} />
          <div className="itemcard-body2">
            <Card.Title className="itemtitle">{item.Name}</Card.Title>
            <Card.Text className="itemdescription">
              <ul>
                <li>Description: {item.ProductDescription}</li>
                <li>Base Price: {item.BasePrice}</li>
                <li>Final Price: {item.FinalPrice}</li>
                <li>Creator: {item.EventHostUsername}</li>
                <li>Sold Event: {item.EventName}</li>
              </ul>
              {/* {id} */}
            </Card.Text>
            <div className="itemtags">
              <ul className="item-tags">
              {
                item.Tags && item.Tags.map((tag, index)=>{
                  return(
                    <li>{tag.Name}</li>
                  );
                })
              }
              </ul>
            </div>
          </div>
        </Card>
        // </Link>
        );   
    }
    else if(itemType==="purchased")
    {
      return (
        <Card className="itembox shadow p-2 mb-3 bg-body rounded" >
          <Card.Img className="event-img" variant="top" src={item.ProductURL} />
          <div className="itemcard-body2">
            <Card.Title className="itemtitle">{item.Name}</Card.Title>
            <Card.Text className="itemdescription">
              <ul>
                <li>Description: {item.ProductDescription}</li>
                <li>Base Price: {item.BasePrice}</li>
                <li>Final Price: {item.FinalPrice}</li>
                <li>Creator: {item.ProductSellerUsername}</li>
                <li>Purchased Event: {item.EventName}</li>
              </ul>
              {/* {id} */}
            </Card.Text>
            <div className="itemtags">
              <ul className="item-tags">
              {
                item.Tags.map((tag, index)=>{
                  return(
                    <li>{tag.Name}</li>
                  );
                })
              }
              </ul>
            </div>
          </div>
        </Card>
        // </Link>
        );     
    }

  }

export default ItemCard;