import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect( ()=> {
        getProducts();
    }, [])

    const getProducts = async () =>{
        let result = await fetch('https://e-dash-board-api.vercel.app/products',{
            headers:{
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setProducts(result);
    }
     const deleteProduct = async(id)=>{
        let result = await fetch(`https://e-dash-board-api.vercel.app/product/${id}`,{
            method:"Delete"
        });
        result = await result.json()
        if(result){
            alert("record is deleted");
            getProducts();
        }
     };

  return (
    <div className='product-list'>
        <h3>Product List</h3>
         <ul>
            <li>S.No</li>
            <li>Name</li>
            <li>Price</li>
            <li>Category</li>
            <li>Operation</li>
         </ul>

         {
            products.length >0 ? products.map((item,index)=>
            <ul key={item._id}>
            <li>{index+1}</li>
            <li>{item.name}</li>
            <li>$ {item.price}</li>
            <li>{item.category}</li>
            <li>
                <button onClick={()=>deleteProduct(item._id)}>Delete</button>
                <Link to={"/update/"+item._id}>Update</Link>
                </li>
         </ul>
            )
           : <h1>No Result found</h1>
         }

    </div>
  )
}

export default ProductList
