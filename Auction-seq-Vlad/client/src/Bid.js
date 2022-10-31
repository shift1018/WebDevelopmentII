import React, {useState, useEffect} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Axios from 'axios';
import { Link,  useParams } from "react-router-dom";

function Bid() {
  
  const [auction, setAuction] = useState([]);
  const [newPrice, setNewPrice] = useState(0);
  const [newEmail, setNewEmail] = useState("");
  const [errorLastBidderEmail, setErrorLastBidderEmail] = useState("");
  const [errorLastBidPrice, setErrorLastBidPrice] = useState("");

  let { id } = useParams();

  function isValidSellerEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidLastBidPrice(newprice, price) {
    return newprice >= price;
  }

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/auction/${id}`).then((response) =>{
      setAuction(response.data);
    });
  }, []);

  const updateAuction = (id) => {
    Axios.patch(`http://localhost:3001/api/auctions/${id}`, {
      id: id,
      lastBidPrice: newPrice,
      lastBidderEmail: newEmail
    });
    setNewPrice(0);
    setNewEmail(null);
    window.location.reload(true);
  };

  return (
    <div className="App">
      <h2>Put a Bid</h2>
      <br></br><br></br><br></br>
      <Link to="/">Return to Auctions</Link>
      <br></br><br></br><br></br>
      <h4>Offer your price:</h4>
            <div>	
			    <table className="table table-striped table-bordered">
				    <thead className="thead-dark">
					    <tr>
						    <th>ID</th>
						    <th>Seller Email</th>
						    <th>Item Name</th>
						    <th>Description</th>
						    <th>Last Bid Price</th>
						    <th>Bidder Email</th>
						    <th>Bid</th>
					    </tr>
				    </thead>
				    <tbody>
                {auction.map((val) => {
                    return (
					    <tr>
						    <td>{val.id}</td>
						    <td>{val.sellerEmail}</td>
						    <td>{val.itemName}</td>
						    <td>{val.itemDescription}</td>
						    <td>{val.lastBidPrice}
                            <br></br>
                                <input type="number" min = {val.lastBidPrice} precision={2} step={0.1} className ="form-control" 
                                    onChange={(e) => {
                                        if (!isValidLastBidPrice(e.target.value, val.lastBidPrice)) {
                                            setErrorLastBidPrice('Not valid bid!');
                                        } 
                                        else {
                                            setErrorLastBidPrice(null);
                                            if(val.lastBidderEmail === null || val.lastBidderEmail === ""){
                                              setNewPrice(val.lastBidPrice);                      
                                            }
                                            else{
                                              if(e.target.value > val.lastBidPrice){
                                                setNewPrice(e.target.value);
                                              }
                                              else{
                                                setErrorLastBidPrice('Put bigger price!');
                                              }
                                            } 
                                        }
                                    }}
                                /> 
                                {errorLastBidPrice && <h6 style={{color: 'red'}}>{errorLastBidPrice}</h6>}
                            </td>
						    <td>{val.lastBidderEmail} 
                            <br></br>
                                <input type="email"  placeholder = "Bidder email" className ="form-control" 
                                    onChange={(e) => {
                                        if (!isValidSellerEmail(e.target.value)) {
                                            setErrorLastBidderEmail('Email is invalid or empty');
                                        } else {
                                            setNewEmail(e.target.value);
                                            setErrorLastBidderEmail(null);
                                        }
                                    }}
                                />
                                {errorLastBidderEmail && <h6 style={{color: 'red'}}>{errorLastBidderEmail}</h6>}
                            </td>
				            <td>
                                <br></br>
                                <button className="btn btn-success"
                                    onClick={()=> {
                                        if(newEmail === null || 
                                          newEmail === "" || 
                                          newPrice === null || 
                                          newPrice === "" ||
                                          newPrice === 0.0 ||
                                          errorLastBidderEmail !== null ||
                                          errorLastBidPrice !== null
                                          ){
                                            setNewPrice(0);
                                            setNewEmail(null);
                                            setErrorLastBidderEmail(null);
                                            setErrorLastBidPrice(null);
                                            window.location.reload(true);
                                        }
                                        else{
                                            updateAuction(val.id)
                                        }
                                    }} 
                                >
                                 Bid&nbsp;&nbsp;
                                </button> 	    
				            </td>
					    </tr>
                    );
                })}
				    </tbody>
			    </table>
		    </div>    
    </div>
  );
}

export default Bid;
