import { useState,useEffect } from 'react'
import './NewCollections.css'
import Item from '../Item/Item'

const NewCollections = () => {

  const [new_collections, setNewCollections] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/all-products')
      .then((response) => response.json())
      .then((data) => {
        setNewCollections(data);
        console.log("Fetched All Products", data);
      });
  }, []);

  return (
    <div className='new-collections'>
        <h1>FEATURED PRODUCTS</h1>
        <hr />
        <div className="collections">
          {new_collections.length === 0 ? (
            <p>No new collections available</p>
          ) : (
            new_collections.map((item, i) => {
              return (
                <Item
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            })
          )}
        </div>
    </div>
  )
}

export default NewCollections