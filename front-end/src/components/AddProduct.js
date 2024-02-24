import React from 'react'
import {useNavigate} from 'react-router-dom'

const AddProduct = () => {

    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false)
    const navigate = useNavigate();
    const addProduct=async()=>{
        console.warn(!name);
        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }
        console.log(name,price,category,company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product",{
            method:'post',
            body:JSON.stringify({name, price, category, company, userId}),
            headers:{
                "Content-Type":"application/json"
            }
    });

    result = await result.json();
    console.log(result);
    if(result){
        navigate('/');
    }
}

  return (
    <div className='product'>
        <h1>Add Product</h1>
        <input type="text" placeholder='Enter Product Name' className='inputBox' 
        value={name}
        onChange={(e)=>{setName(e.target.value)}}/>
        {error && !name && <span className='invalid-input'>Enter Valid name</span>}
        <input type="text" placeholder='Enter product price' className='inputBox'  value={price} onChange={(e)=>{setPrice(e.target.value)}} />
        {error && !price && <span className='invalid-input'>Enter Valid price</span>}
        <input type="text" placeholder='Enter product category' className='inputBox' onChange={(e)=>{setCategory(e.target.value)}}  value={category} />
        {error && !category && <span className='invalid-input'>Enter Valid category</span>}
        <input type="text" placeholder='Enter product company' className='inputBox' onChange={(e)=>{setCompany(e.target.value)}}  value={company}/>
        {error && !company && <span className='invalid-input'>Enter Valid company</span>}
        <button onClick={addProduct}className='appButton'>Add Product</button>
    </div>
  )
}

export default AddProduct