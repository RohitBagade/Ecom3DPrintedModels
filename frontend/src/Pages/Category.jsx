import React, { useContext } from 'react'
import './CSS/Category.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown-icon.png'
import Item from '../Components/Item/Item'

const Category = (props) => {

  const {all_product} = useContext(ShopContext);
  console.log("🔍 all_product in Category:", all_product);
  console.log("🔍 Category Props:", props);

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt='' />
      <div className='shopcategory-indexSort'>
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className='shopcategory-sort'>
          Sort by <img src={dropdown_icon} alt='' />
        </div>
      </div>
      <div className='shopcategory-products'>
        {all_product.map((item, i) => {
          if (item.category === props.category) {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          }
          else {
            return null;
          }
        })}
      </div>
      <div className='shopcategory-loadmore'>
        Explore More
      </div>
    </div>
  )
}

export default Category