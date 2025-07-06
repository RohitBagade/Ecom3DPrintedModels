import React from 'react'
import './Popular.css'
import Item from '../Item/Item'

const Popular = () => {

  const [popular_products, setPopularProducts] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:4000/popular-protein')
      .then((response) => response.json())
      .then((data) => {
        setPopularProducts(data);
        console.log("Fetched Popular Products:", data);
      });
  }, []);

  return (
    <div className='popular'>
        <h1>POPULAR IN PROTEIN</h1>
        <hr />
        <div className="popular-item">
          {popular_products.map((item,i) => {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          })}
        </div>
    </div>
  )
}

export default Popular