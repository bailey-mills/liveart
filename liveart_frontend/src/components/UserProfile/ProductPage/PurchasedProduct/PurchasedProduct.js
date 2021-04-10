import React, { useState } from "react";
import Navbar from "../../../Navbar/Navbar";
import Sidebar from "../../../Sidebar/Sidebar";
import "./PurchasedProduct.css";
import ItemCard from "../../../ItemCard/ItemCard"



function PurchasedProduct(props){

    const sample = [
        {
            "ID": 2,
            "Name": "Naturel",
            "ProductDescription": "Description of the artwork here",
            "ProductURL": "https://cdn.singulart.com/artworks/pictures/cutout/4485/13603/carousel/serie_13603_c66d8d164efbafcaa6386a2e43975ebf.png",
            "BasePrice": 61,
            "FinalPrice": 110,
            "ProductSellerUsername": "Lenora_Trafford_523",
            "EventID": 2,
            "EventName": "Sculptures for auction",
            "StartTime": "2021-03-12T11:00:00.000Z",
            "EndTime": "2021-03-12T12:13:00.000Z",
            "CategoryID": 2,
            "CategoryName": "Sculpture",
            "Tags": [
                {
                    "ID": 10,
                    "Name": "Wooden Statue"
                }
            ]
        },
        {
            "ID": 106,
            "Name": "Cast Iron",
            "ProductDescription": "Description of the artwork here",
            "ProductURL": "https://static.wixstatic.com/media/74c309_f113fb9c7f2b4ecb80fa90f24ac56529~mv2.jpg/v1/fill/w_740,h_992,al_c,q_90,usm_0.66_1.00_0.01/74c309_f113fb9c7f2b4ecb80fa90f24ac56529~mv2.webp",
            "BasePrice": 527,
            "FinalPrice": 683,
            "ProductSellerUsername": "Anibal_Roesch_459",
            "EventID": 49,
            "EventName": "Sculptures for auction",
            "StartTime": "2021-04-05T19:00:00.000Z",
            "EndTime": "2021-04-05T20:31:00.000Z",
            "CategoryID": 2,
            "CategoryName": "Sculpture",
            "Tags": [
                {
                    "ID": 13,
                    "Name": "Abstract Sculpture"
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
                <div className="content-body">
                    <div className="purchasedproducts-title">
                    <h1>Purchased Items</h1>
                    </div>
                   
                    <div className="purchasedproducts-cards">
                    {
                        sample.map((item, index) =>{
                            return(
                                <ItemCard item={item} itemType="purchased" />
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

export default PurchasedProduct;