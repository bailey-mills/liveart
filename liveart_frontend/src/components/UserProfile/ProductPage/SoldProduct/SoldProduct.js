import React, { useState } from "react";
import Navbar from "../../../Navbar/Navbar";
import Sidebar from "../../../Sidebar/Sidebar";
import "./SoldProduct.css";
import ItemCard from "../../../ItemCard/ItemCard"



function SoldProduct(props){

    const sample = [
        {
            "ID": 2,
            "Name": "Naturel",
            "ProductDescription": "Description of the artwork here",
            "ProductURL": "https://cdn.singulart.com/artworks/pictures/cutout/4485/13603/carousel/serie_13603_c66d8d164efbafcaa6386a2e43975ebf.png",
            "BasePrice": 61,
            "FinalPrice": 110,
            "EventID": 2,
            "EventName": "Sculptures for auction",
            "StartTime": "2021-03-12T11:00:00.000Z",
            "EndTime": "2021-03-12T12:13:00.000Z",
            "EventHostUsername": "Lenora_Trafford_523",
            "Tags": [
                {
                    "ID": 10,
                    "Name": "Wooden Statue"
                }
            ]
        },
        {
            "ID": 3,
            "Name": "Yam",
            "ProductDescription": "Description of the artwork here",
            "ProductURL": "https://cdn.singulart.com/artworks/v2/cutout/4485/main/carousel/1075201_609ade9932cf370aaf3dbfe9eb44ffa4.png",
            "BasePrice": 822,
            "FinalPrice": 1059,
            "EventID": 2,
            "EventName": "Sculptures for auction",
            "StartTime": "2021-03-12T11:00:00.000Z",
            "EndTime": "2021-03-12T12:13:00.000Z",
            "EventHostUsername": "Lenora_Trafford_523",
            "Tags": [
                {
                    "ID": 10,
                    "Name": "Wooden Statue"
                }
            ]
        },
        {
            "ID": 4,
            "Name": "Renwick Beige",
            "ProductDescription": "Description of the artwork here",
            "ProductURL": "https://cdn.singulart.com/artworks/pictures/cutout/4485/13603/carousel/serie_13603_c66d8d164efbafcaa6386a2e43975ebf.png",
            "BasePrice": 821,
            "FinalPrice": 1455,
            "EventID": 2,
            "EventName": "Sculptures for auction",
            "StartTime": "2021-03-12T11:00:00.000Z",
            "EndTime": "2021-03-12T12:13:00.000Z",
            "EventHostUsername": "Lenora_Trafford_523",
            "Tags": [
                {
                    "ID": 9,
                    "Name": "Humanoid Figure"
                },
                {
                    "ID": 10,
                    "Name": "Wooden Statue"
                }
            ]
        }
    ];


    // console.log(props.match.params.username);
    let currentUsername = localStorage.getItem('user');;
    if(currentUsername===null)
    {
        //jump to login page
    }

    return(
        <div>
            <Navbar />
            
            <div className="main-body">
            <Sidebar username={currentUsername}/>
                <div className="content-body ">
                    <div className="soldproducts-title">
                    <h1>Sold Items</h1>
                    </div>
                    
                    <div className="soldproducts-cards">
                    {
                        sample.map((item, index) =>{
                            return(
                                <ItemCard item={item} itemType="sold" />
                            );
                        })
                    }
                    </div>
                </div>
                {/* This is UserProfile page for {props.match.params.username} */}
                {/* This is UserProfile page for {currentUsername} */}
                

            </div>
        </div>
    );

}

export default SoldProduct;