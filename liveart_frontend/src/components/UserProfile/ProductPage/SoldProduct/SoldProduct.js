import React, { useState , useEffect } from "react";
import Navbar from "../../../Navbar/Navbar";
import Sidebar from "../../../Sidebar/Sidebar";
import "./SoldProduct.css";
import ItemCard from "../../../ItemCard/ItemCard"
import axios from "axios";


function SoldProduct(props){

    // console.log(props.match.params.username);
    let currentUsername = localStorage.getItem('user');;
    if(currentUsername===null)
    {
        //jump to login page
    }

    const [items, setItems] = useState([]);
    useEffect(()=>{
        
        axios.get(process.env.REACT_APP_SERVER + '/product/getSold/'+currentUsername).then(res=>{
            if(res.status!==200){
                alert("Can't connect to the backend server");
                return;
            }
    
            setItems(res.data);
            //console.log("from backend", userinfo);
        })
        
    },[]);

    return(
        <div>
            <Navbar />
            
            <div className="main-body">
            <Sidebar username={currentUsername}/>
                <div className="content-body ">
                    <div className="home-page-content">
                        <div className="soldproducts-title">
                            <h3 style={{textAlign:"center", paddingTop:"10px"}}>Sold Items</h3>
                        </div>
                        
                        <div className="soldproducts-cards-tall">
                        {
                            items && items.map((item, index) =>{
                                return(
                                    <ItemCard item={item} itemType="sold" />
                                );
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default SoldProduct;