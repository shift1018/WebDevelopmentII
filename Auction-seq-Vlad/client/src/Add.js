import React, {useState} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Axios from 'axios';
import { Link } from "react-router-dom";


function Add() {

  const [sellerEmail, setSellerEmail] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [lastBidPrice, setLastBidPrice] = useState(0);

  const [errorSellerEmail, setErrorSellerEmail] = useState("");
  const [errorItemName, setErrorItemName] = useState("");
  const [errorLastBidPrice, setErrorLastBidPrice] = useState("");
  const [errorItemDescription, setErrorItemDescription] = useState("");

  const [success, setSuccess] = useState("");

  function isValidSellerEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidItemName(itemName) {
    return /^[-0-9A-Za-z.,/_() ]{2,100}$/.test(itemName);
  }

  function isValidItemDescription(itemDescription) {
    return /^(.{2,10000})$/.test(itemDescription);
  }

  function isValidLastBidPrice(lastBidPrice) {
    return (lastBidPrice >= 0);
  }

  const resetInputField = () => {
    document.getElementById('sellerEmail').value = "";
    document.getElementById('itemName').value = "";
    document.getElementById('itemDescription').value = "";
    document.getElementById('lastBidPrice').value = 0;
    setSellerEmail("");
    setItemName("");
    setItemDescription("");
    setLastBidPrice(0);
  };

  const submitAuction = () => {
    Axios.post("http://localhost:3001/api/auctions", {
      sellerEmail: sellerEmail,
      itemName: itemName,
      itemDescription: itemDescription,
      lastBidPrice: lastBidPrice
    });
    resetInputField();
    setSuccess(`You, ${sellerEmail}, have successfully added the auction!`);
  };

  return (
    <div className="App">
      <h2>Create New Auction</h2>
      <br></br><br></br>
      <Link to="/">Return to Auctions</Link>
      <br></br><br></br><br></br><br></br>
      <div className ="container">
        <label className="form-label">Seller email:</label>
        <input type="email" name="sellerEmail" className ="form-control" id="sellerEmail" onChange={(e)=> {
          setSuccess("");
          if (!isValidSellerEmail(e.target.value)) {
            setErrorSellerEmail('Email is invalid or empty');
          } else {
            setSellerEmail(e.target.value);
            setErrorSellerEmail(null);
          }
        }}/>
        {errorSellerEmail && <h6 style={{color: 'red'}}>{errorSellerEmail}</h6>}
        <br></br>

        <label className="form-label">Item name:</label>
        <input type="text" name="itemName" className ="form-control" id="itemName" onChange={(e)=> {
          setSuccess("");
          if (!isValidItemName(e.target.value)) {
            setErrorItemName('Item name is not in range [0-9A-Za-z.,/-_() ]{2,100} or empty');
          } else {
            setItemName(e.target.value);
            setErrorItemName(null);
          }
        }}/>
        {errorItemName && <h6 style={{color: 'red'}}>{errorItemName}</h6>}
        <br></br>

        <label className="form-label">Initial price:</label>
        <input type="number" min = {0} step={0.1} precision={2} name="lastBidPrice" id="lastBidPrice" className ="form-control"  
          onChange={(e)=> {
            setSuccess("");
            if (!isValidLastBidPrice(e.target.value)) {
              setErrorLastBidPrice('The price is not  >= 0 or empty');
            } else {
              setLastBidPrice(e.target.value);
              setErrorLastBidPrice(null);
            }
          }} 
        />
        {errorLastBidPrice && <h6 style={{color: 'red'}}>{errorLastBidPrice}</h6>}
        <br></br>

        <label className="form-label">Item Description:</label>
        <textarea type="textarea" name="itemDescription" className ="form-control" id="itemDescription" onChange={(e)=> {
          setSuccess("");
          if (!isValidItemDescription(e.target.value)) {
            setErrorItemDescription('The description is not in range (2-10000) or empty');
          } else {
            setItemDescription(e.target.value);
            setErrorItemDescription(null);
          }
        }}/>
        {errorItemDescription && <h6 style={{color: 'red'}}>{errorItemDescription}</h6>}
        <br></br>
        {success && <h5 style={{color: 'green'}}>{success}</h5>}
        <br></br>

        <button className="btn btn-primary" onClick={()=>{
          if(errorSellerEmail !== null || 
             errorItemName !== null || 
             errorLastBidPrice !== null || 
             errorItemDescription !== null || 
             lastBidPrice === 0 ||
             lastBidPrice === "" ||
             sellerEmail === "" ||
             itemName === "" ||
             itemDescription === ""
          ){
            window.location.reload(true);
          }else{
            submitAuction();
          }
        }}
        >
          Add new auction
        </button>
      </div>
    </div>
  );
}

export default Add;
