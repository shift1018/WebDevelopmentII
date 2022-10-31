import React from 'react'
import {useEffect, useState, useContext } from "react";
import axios from "axios";
import '../bootstrap-5.2.1/dist/css/bootstrap.css';
import { AuthContext } from "../helper/AuthContext"
import { useNavigate } from "react-router-dom"; 

function Home() {
    // const [listOfAuctions, setListOfAuctions] = useState([]);
    
    // const navigate = useNavigate();

    // useEffect(()=>{
    //     axios.get("http://localhost:3001/auctions").then((response)=>{
    //       setListOfAuctions(response.data);
    //     });
    // },[]);
    const navigate = useNavigate();
    // const [listOfPosts, setListOfPosts] = useState([]);
    // const [likedPosts, setLikedPosts] = useState([]);
    // const { authState } = useContext(AuthContext);


    // useEffect(() => {
    //     if (!localStorage.getItem("accessToken")) {
    //         navigate("/login");
    //     } else {
    //       axios
    //         .get("http://localhost:3001/posts", {
    //           headers: { accessToken: localStorage.getItem("accessToken") },
    //         })
    //         .then((response) => {
    //           setListOfPosts(response.data.listOfPosts);
    //           setLikedPosts(
    //             response.data.likedPosts.map((like) => {
    //               return like.PostId;
    //             })
    //           );
    //         });
    //     }
    //   }, []);

    return (
      
        <div >
            home
            {/* <div className="row ">
                {listOfAuctions.map((value, key)=>{
                    return  (
                    <div className="auction col-3 my-3 bg-secondary bg-gradient" 
                    onClick={()=>{
                        navigate(`/auction/${value.id}`);
                    }}>
                        <div className="form-control col my-1">{value.itemName}</div>
                        <div className="form-control col my-1">{value.sellerEmail}</div>
                        <div className="form-control col my-1  text-break p-2">{value.itemDescription}</div>            
                        <div className="form-control col my-1">{value.lastBidPrice}</div>
                        <div className="form-control col my-1">{value.lastBidderEmail}</div>
                    
                    </div>
                    );
                })}


                
                http://www.srcmini.com/61979.html, use bootstrap
            </div>
                 */}
        </div>
           
      );
}

export default Home;
