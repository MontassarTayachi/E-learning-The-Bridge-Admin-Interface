
import React, { useState } from 'react';
import {
    FaTh,
    FaBars,        
}from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { FaBookMedical } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
  import"../Styles/SideBar.css";
import ima from "../img/admin.png"
const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/Menu",
            name:"Home",
            icon:<FaHome/>
        },
      
        {
            path:"/AjouterCour",
            name:"Add Course",
            icon:<FaBookMedical />
        },
        {
            path:"/Cours",
            name:"Courses",
            icon:<ImBooks />
        },
        
      
   
    ]
    return (
        <div className="container-fluid bg-secondary min-vh-100 ">
           <div style={{width: isOpen ? "220px" : "50px"}} className="sidebar pd-4">
               <div className="top_section">
                  <img
    alt="Admin Avatar"
    style={{ display: isOpen ? "block" : "none" }}
    src={ima}
    className='logo'
  />
                   <div style={{marginLeft: isOpen ? "0px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main><div className='row'><div style={{width: isOpen ? "190px" : "0px"}}></div><div className='col'>{children}</div></div></main>
        </div>
    );
};

export default Sidebar;