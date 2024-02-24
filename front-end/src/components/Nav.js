import React from 'react';
import { Link, useNavigate} from 'react-router-dom';

const Nav=()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout =()=>{
        localStorage.clear();
        navigate('/Signup');
    }
    return(
    <div>
         <img className='logo1' src="https://t3.ftcdn.net/jpg/02/47/48/00/360_F_247480017_ST4hotATsrcErAja0VzdUsrrVBMIcE4u.jpg" alt=""/>
        {auth ? <ul className='nav-ul'>
            <li><Link to="/">Products</Link></li>
             <li><Link to="/add">Add Product</Link></li>
             <li> <Link onClick={logout} to="/Signup">Logout({JSON.parse(auth).name})</Link></li>
             </ul>
             :
             <ul className='nav-ul nav-right'>
             <li><Link to="/Signup">Logout</Link></li>
            <li><Link to="/login">Login</Link></li>
             </ul>
        }
    </div>
    )
}

export default Nav;