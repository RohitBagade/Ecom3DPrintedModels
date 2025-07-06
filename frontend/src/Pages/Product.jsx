import React from 'react'
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
// import './CSS/Product.css';
// import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
// import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelativeProducts';

const Product = () => {

  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === parseInt(productId));

  if (!product) {
    return <div style={{ padding: "30px", textAlign: "center" }}>Product not found</div>;
  }

  console.log("🔍 Product Details:", product);
  console.log("🔍 All Products in Product Page:", all_product);

  return (
    <div>
      {/* <Breadcrum product={product} /> */}
      <ProductDisplay product={product} />
      {/* <DescriptionBox /> */}
      <RelatedProducts product={product}/>
    </div>
  )
}

export default Product