import {useEffect, useState} from "react";
import './App.css';
import axios from "axios";
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from "./pages/Home";
import { AuthContext } from "./helper/AuthContext"
import Registration from "./pages/Registration";
import Login from "./pages/Login";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };


  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);


  return (
    <div className="App"> 
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
              <div className="links col-5">
                {!authState.status ? (
                  <>
                    <Link to="/"> Home Page</Link>
                    <Link to="/login"> Login</Link>
                    <Link to="/registration"> Registration</Link>
                  </>
                ) : (
                  <>
                    <Link to="/"> Home Page</Link>
                    <Link to="/createpost"> Create A Post</Link>
                  </>
                )}
              </div>
              <div className="loggedInContainer col-3">
                <h1>{authState.username} </h1>
                {authState.status && <button onClick={logout}> Logout</button>}
              </div>
          </div>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/createauction" element={<CreateAuction />} />
            <Route path="/auction/:id" element={<Auction />} />
            <Route path="/historys/:id" element={<Auction />} /> */}
          </Routes>
        </Router>
      </AuthContext.Provider>

    </div>
  );
}

export default App;
