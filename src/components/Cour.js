import React from "react";
import "../Styles/Cour.css"
import Button from 'react-bootstrap/Button';
function Cour({ image, name,price ,id,function1,function2,function3,function4}) {
 
  return (
    <div className="menuItem">
      <div style={{ backgroundImage: image ? `url(http://localhost:4000/images/${encodeURIComponent(image)}` : 'none' }} className="img"></div>
      <h1> {name} </h1>
      <div>
        <p>Price:{price} DT/ Month</p>
      </div>
      <Button className="m-2" onClick={()=>{function1(name,id,image);function2();function3();}}>Modifier</Button>
     <Button variant="danger" onClick={()=>{function4(id);function3();}} >Delete</Button>
    </div>
  );
}

export default Cour;
