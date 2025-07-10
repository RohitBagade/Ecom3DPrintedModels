import React, { useContext } from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import { ShopContext } from '../../Context/ShopContext'

const RelatedProducts = (props) => {

  const { product } = props;
  const { all_product } = useContext(ShopContext);

  return (
    <div className='relatedproducts'>
      <h1>People Also Like...</h1>
      <div className="relatedproducts-item">
        {all_product.map((item) => {
          if (item.id !== product.id) {
            return <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          }
          else {
            return null;
          }
        })}
      </div>
    </div>
  )
}

export default RelatedProducts