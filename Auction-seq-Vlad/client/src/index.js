import React from 'react';
import App from './App';
import Add from './Add';
import Bid from './Bid';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route} from "react-router-dom";

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="Add" element={<Add/>} />
        <Route path="Bid/:id" element={<Bid/>} />
      </Routes>
    </BrowserRouter>
);


