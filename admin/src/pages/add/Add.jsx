import React from 'react'
import './Add.css'
import axios from 'axios';

import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import {assets} from '../../assets/assets'
import { useNavigate } from 'react-router-dom';

function Add({url}) {
  const navigate = useNavigate();
  
    const [img, setImg] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad",
    })

    const onChangeHandelar = (e)=>{
      const name = e.target.name;
      const value = e.target.value;
      setData({
        ...data,
        [name]:value
      })


    }

    const onSubmitHandelar = async (e)=>{
      e.preventDefault();
      if (!img) {
        alert("Please upload an image");
        return;
      }
     
      const formData = new FormData();
      formData.append("name",data.name);
      formData.append("description",data.description);
      formData.append("price",Number(data.price));
      formData.append("category",data.category);
      formData.append("image", img);

      const respon= await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        

      })
      if(respon.data.success){
        
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        toast.success("Product added successfully");
        setImg(null);
        navigate('/list');
      }else{
        toast.error(respon.data.message);
      }
    }

    useEffect(() => {
      
      return () => {
        if (img) {
          URL.revokeObjectURL(img);
        }
      };
    }, [img]);


  return (
    <div className="add">
      
      <form className="flex-col" onSubmit={onSubmitHandelar}>
        <div className="add-img-uplode flex-col">
          <p>Uplode Image</p>
          <label htmlFor="img-file">
            <img
              src={img ? URL.createObjectURL(img) : assets.upload_area}
              alt=""
            ></img>
          </label>
          <input
            type="file"
            id="img-file"
            onChange={(e) => setImg(e.target.files[0])}
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            placeholder="Enter Product Name"
            required
            onChange={onChangeHandelar}
            value={data.name}
          />
        </div>
        <div className="add-product-dec">
          <p>Product Description</p>
          <textarea
            placeholder="Enter Product Description"
            row="6"
            required
            name="description"
            onChange={onChangeHandelar}
            value={data.description}/>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name="category" id="category" required onChange={onChangeHandelar} >
              <option value="" disabled selected>
                Select Category
              </option>
              <option value="Burger">Burger</option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input type="number" name="price" placeholder="$20" required onChange={onChangeHandelar} value={data.price}/>
          </div>
        </div>
        <button className="add-btn" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default Add