import React, {useState, useRef} from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png'; // Adjust the path as necessary
import cart from '../Assets/cart.png'; // Adjust the path as necessary
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { useContext } from 'react';
import nav_dropdown from '../Assets/dropdown-icon.png';

export const Navbar = () => {

    const[menu, setMenu] = useState("home");
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p onClick={()=>{setMenu("home")}}><Link style={{textDecoration:'none', color:'#171717'}} to='/'>Protein</Link>{menu==="home"}</p>
        </div>
        <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
        <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>{setMenu("home")}}><Link style={{textDecoration:'none', color:'#626262'}} to='/'>Home</Link>{menu==="home" ? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Protein")}}><Link style={{textDecoration:'none', color:'#626262'}} to='/protein'>Protein</Link>{menu==="Protein" ? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Gainer")}}><Link style={{textDecoration:'none', color:'#626262'}} to='/gainer'>Gainer</Link>{menu==="Gainer" ? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Creatine")}}><Link style={{textDecoration:'none', color:'#626262'}} to='/creatine'>Creatine</Link>{menu==="Creatine" ? <hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
            {localStorage.getItem("auth-token") ? <button onClick={() => {localStorage.removeItem("auth-token"); window.location.replace('/');}}>Logout</button> 
            : <Link to='/login'><button>Login</button></Link>}
            <Link to='/cart'><img src={cart} alt=""/></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

export default Navbar;