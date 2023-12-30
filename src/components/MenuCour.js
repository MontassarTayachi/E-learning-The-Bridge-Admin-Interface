import React from "react";
import '../Styles/MenuCour.css'
import Cour from "./Cour";
import { Button } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import  { useState,useEffect } from 'react';

export const Cours = () => {
  ///////////////////////////   
  const [menuList, setmenuList] = useState([]);
       const relodedata = async () =>{
              let test=null
              try {            
                const response = await fetch("http://localhost:4000/select/coures");
                test = await response.json();
                
              
                // Clean up the "image" property in each item
                test = test.map(item => ({
                  ...item,
                  image: item.image.trim().replace(/^null/, '')
                }));
                
              } catch (err) {
                console.error(err.message);
                test = []; // Set a default value (empty array) in case of an error
              }
              setmenuList(prevState => test);
            }
            useEffect(() => {
              relodedata();
          }, []);
/////////////////////////////
const [selectedImage, setselectedImage] = useState(null);
const [titleModifier, setTitleModifier] = useState(null);
const [priceModifier, setPriceModifier] = useState(null);
const [title, setTitle] = useState(false);
const [imagebd, setImagebd] = useState(null);
const [id, setId] = useState(false);
const [preview, setPreview] = useState(false);

const handleTitleChange = (event) => {
  setTitleModifier(event.target.value);
};
const handlePriceChange = (event) => {
  setPriceModifier(event.target.value);
};

const handleImageChange = (e) => {
  const file = e.target.files[0];
  const renamedImage = new File([file], imagebd, {
    type: file.type,
  });
  setselectedImage(renamedImage);
};
const Modifiername = (test,id,image) => {
  setTitle(test);
  setId(id);
  setImagebd(image)
};

const ModifierClose = () => {
  setPreview(false);
};
const ModifierOpen = () => {
  setPreview(true);
};
const ModifierTitel =async () => {
  try {
    await  fetch(`http://localhost:4000/modifier/cour/nom/${id}/${titleModifier}`, {
      method: "POST"
    });
    alert('Titel Modifier')
  } catch (error) {
    console.error("Error modifier nom du  cour:", error.message);
  }

}
const Modifierprice =async () => {
  try {
    await  fetch(`http://localhost:4000/modifier/cour/price/${id}/${priceModifier}`, {
      method: "POST"
    });
    alert('course Modifier ')
    
  } catch (error) {
    console.error("Error modifier prix du  cour:", error.message);
  }

}
const DeleteCourse =async (idr) => {
  try {
    await  fetch(`http://localhost:4000/delete/cour/${idr}`, {
      method: "Delete"
    });
    alert('Course Delete')
    
  } catch (error) {
    console.error("Error Delete  du  cour:", error.message);
  }

}

const Modifierimage =async () => {
  const data = new FormData();
  data.append('selectedImage', selectedImage);


  try {
    const response = await fetch('http://localhost:4000/test', {
      method: 'POST',
      body: data,
    });

    if (response.ok) {
      const responseData = await response.json();
      alert('image Modifier');
      
    } else {
      throw new Error('Failed to upload image');
    }
  } catch (error) {
    console.error('Error uploading image:', error.message);
    alert('Error uploading image: ' + error.message);
  }
}
const handleSubmit = async(event) => {
  event.preventDefault();
  if (priceModifier !== null) {
    await Modifierprice();
  }
  if (titleModifier !== null) {
    await ModifierTitel();
  }
  if(selectedImage !== null){
    await Modifierimage();
  }
  relodedata();
  
};



return<>
<div className="cours">
<div className="menu">
<div className="menuList">                     
        {menuList.map((menuItem, key) => {
          return (
            <Cour
              key={key}
              image={menuItem.image}
              name={menuItem.title}
              price={menuItem.price}
              id={menuItem.id}
              function1={Modifiername}
              function2={ModifierOpen}
              function3={relodedata}
              function4={DeleteCourse}
            />
          );
        })}
      </div>
</div>
</div>
{preview &&<div className="Modifier">  
         <button className="buton" onClick={ModifierClose}><IoCloseSharp /></button>
         <h1> {title} </h1><hr className="solid"></hr>
         <form>
         <label>Course Name</label>
         <input type="text" name="nomModifier" value={titleModifier} onChange={handleTitleChange} ></input>
         <label>Course Price</label>
         <input type="text" name="prixModifier" value={priceModifier} onChange={handlePriceChange}></input>
         <label>Course  Image </label>
         <input className='inputfile'  name='selectedImage' type="file" accept="image/*" onChange={handleImageChange} />
         <Button className="bout" type="submit" onClick={handleSubmit}>Modifier </Button>
         </form>         
         </div>}
</>
}