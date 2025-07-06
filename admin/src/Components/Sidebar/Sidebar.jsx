import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import addProductIcon from '../../assets/add-product-icon.png'
import listProductIcon from '../../assets/list-product-icon.png' 

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/add-product" style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
            <img src={addProductIcon} alt="" />
            <p>Add Product</p>
        </div>
      </Link>
      <Link to="/list-product" style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
            <img src={listProductIcon} alt="" />
            <p>Product List</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar