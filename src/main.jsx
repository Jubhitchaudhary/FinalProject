import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePost from './pages/CreatePost.jsx';


import EditPost from './pages/EditPost.jsx';
import Info from './pages/Info.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route index={true} path="/" element={<App />} />
          <Route index={false} path="/create" element={<CreatePost/>} />
          
          <Route index={false} path="/edit/:id" element={<EditPost/>}/>
          <Route index={false} path="/info/:id" element={<Info/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
