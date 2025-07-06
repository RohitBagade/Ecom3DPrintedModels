import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star.png'
import star_icon_empty from '../Assets/white-star.png'
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {

    const {product} = props;
    const {addToCart} = useContext(ShopContext);

  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <div className="right-up">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img className='star' src={star_icon} alt="" />
                    <img className='star' src={star_icon} alt="" />
                    <img className='star' src={star_icon} alt="" />
                    <img className='star' src={star_icon} alt="" />
                    <img className='empty-star' src={star_icon_empty} alt="" />
                </div>
                <h2>Description</h2>
                <div className='productdisplay-description'>
                    {/* {product.description} */}
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit nihil consequatur tempore incidunt mollitia molestias et delectus ipsa fugiat recusandae quam, omnis explicabo rerum enim doloribus, praesentium suscipit magni. Eum totam placeat, fugiat vel, exercitationem ipsa odit assumenda ut amet necessitatibus aliquid dolorum qui, sit modi non nisi sint soluta aperiam a inventore? Quia nesciunt voluptatibus quibusdam reprehenderit eos. Quae magnam repellat itaque praesentium, similique, voluptatem odio quasi voluptates hic repellendus dignissimos officiis culpa! Quae laudantium laboriosam vitae laborum voluptates vero enim explicabo sint, exercitationem facilis ullam modi voluptatum illum aut consectetur id? Nisi dignissimos dicta a fugiat nesciunt sequi.
                </div>
            </div>
            <div className="right-down">
                <div className="productdisplay-prices">
                    <div className="productdisplay-price-new">&#8377;{product.new_price}</div>
                    <div className="productdisplay-price-old">&#8377;{product.old_price}</div>
                </div>
                <button onClick={() => addToCart(product.id)}>ORDER NOW</button>
            </div>
        </div>
    </div>
  )
}

export default ProductDisplay