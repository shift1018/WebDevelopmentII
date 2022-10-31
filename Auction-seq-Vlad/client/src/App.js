import React, {useState, useEffect} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Axios from 'axios';
import { Link } from "react-router-dom";


function App() {
  
  const [auctionList, setAuctionList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/auctions").then((response) =>{
      setAuctionList(response.data);
    });
  }, []);

  const deleteAuction = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`);
    window.location.reload(false);
  };

  return (
    <div className="App">
      <h2>Welcome to our Auctions</h2>
      <br></br><br></br><br></br>
      <Link to="/Add"><button className="btn btn-primary">Add new auction</button></Link>
      <br></br><br></br><br></br>
      <h4>The list of Auctions:</h4>
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
						    <th>Bid &nbsp; &nbsp; | &nbsp; Disable</th>
					    </tr>
				    </thead>
				    <tbody>
            {auctionList.map((val) => {
            return (
					    <tr>
						    <td>{val.id}</td>
						    <td>{val.sellerEmail}</td>
						    <td>{val.itemName}</td>
						    <td>{val.itemDescription}</td>
						    <td>{val.lastBidPrice}</td>
						    <td>{val.lastBidderEmail}</td>
						    <td>
                <Link to={`/Bid/${val.id}`}>
                    <button className="btn btn-success">Bid</button>
                </Link>
                  &nbsp;&nbsp;&nbsp;
                  <button onClick={() => {deleteAuction(val.id)}} className="btn btn-danger">Disable</button> 	    
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
export default App;
