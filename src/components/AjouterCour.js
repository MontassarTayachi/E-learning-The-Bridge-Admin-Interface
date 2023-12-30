import React, { useState,useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../Styles/AjouteCour.css'


function AjouterCour() {
  const [preview, setPreview] = useState(null);
  const [Image, SetImage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    await SetImageName();
    // Move the alert statement inside SetImageName
    
    const renamedImage = new File([file], Image, {
      type: file.type,
    });
    setSelectedImage(renamedImage);
    setPreview(URL.createObjectURL(file));
  };
  
  const SetImageName = async () => {
    try {
      const response1 = await fetch("http://localhost:4000/max/id_cour");
      const jsonData1 = await response1.json();
      const name = "image" + jsonData1.max  + ".jpg";
      SetImage(name);
      console.log('Image set to:', name);
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };
  useEffect(() => {
    SetImageName();
  }, []);
  const handleRefresh = () => {
    const rr={
      title: "",
      price: "",
     }
      setFormData(rr);
      SetImageName();
      setSelectedImage(null);
   
  };

  const [formData, setFormData] = useState({
    title: "",
    price: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      alert('Please select an image to upload.');
      return;
    }


    const {
      title,price 
    } = formData;

    try {
      const body = { title, Image,price };
      const response = await fetch('http://localhost:4000/insert/cour', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert('Course ajouté avec succès!');
        setPreview(null);
       
        
      } else {
        console.error('Erreur lors de l\'ajout du plat:', response.statusText);
        alert('Erreur lors de l\'ajout du plat.', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du plat:', error);
      alert('Erreur lors de l\'ajout du plat.', error);
    }

    const data = new FormData();
    data.append('selectedImage', selectedImage);


    try {
      const response = await fetch('http://localhost:4000/test', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        
        console.log("uploading image:")
        
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error.message);
      alert('Error uploading image: ' + error.message);
    }
    
    handleRefresh();
  };

 
 
 
 
 
 
 return <div>
  <div className="contact">

    <div className="leftSide">
      {preview && <img src={preview} alt="Aperçu de l'image" style={{ maxWidth: '82vh', maxHeight: '82vh' }} />}
      {!preview && <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}

    </div>
    <div className="rightSide">
      <h1>
       Add Courses<hr className="solid"></hr>
      </h1>
      <form enctype="multipart/form-data" onSubmit={handleFormSubmit}>
        <label>Course Name</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        <label>Course Price :</label>
        <input type="text" name='price' value={formData.price} onChange={handleChange} required />
        <input className='inputfile'  name='selectedImage' type="file" accept="image/*" onChange={handleImageChange} />
            
         <button type="submit">Add Course</button>
      </form>
    </div>



  </div>
</div>}
  export default AjouterCour;