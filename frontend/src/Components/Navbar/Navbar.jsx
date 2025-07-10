import React, {useState, useRef} from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png'; // Adjust the path as necessary
// import cart from '../Assets/cart.png'; // Adjust the path as necessary
import { Link } from 'react-router-dom';
// import { ShopContext } from '../../Context/ShopContext';
// import { useContext } from 'react';
// import nav_dropdown from '../Assets/dropdown-icon.png';

export const Navbar = () => {

    const[menu, setMenu] = useState("home");
    const menuRef = useRef();

    

  return (
    <div className='navbar'>
        <div onClick={()=>{setMenu("home")}} className="nav-logo">
            <Link to='/'><img src={logo} alt="" /></Link>
        </div>
        <div className="nav-menu">
            <ul ref={menuRef}>
                <li onClick={()=>{setMenu("home")}}><Link style={{textDecoration:'none', color:'#626262'}} to='/'>Explore</Link>{menu==="home" ? <hr/>:<></>}</li>
            </ul>
            {localStorage.getItem("auth-token") ? <button onClick={() => {localStorage.removeItem("auth-token"); window.location.replace('/');}}>Logout</button> 
            : <Link to='/login'><button>Login</button></Link>}
        </div>
    </div>
  )
}

export default Navbar;