import {useEffect, useState} from 'react'
import './ListProduct.css'
import remove_icon from '../../assets/cancel.png'

const ListProduct = () => {

  const [allproducts, setAllProducts] = useState([])

  const fetchInfo = async () => {
   
    await fetch('http://localhost:4000/all-products').then((response) => response.json())
    .then((data) => {setAllProducts(data)})
    .catch((error) => {
      console.error('Failed to fetch all products');
    });
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    // This function will handle the removal of a product
    await fetch('http://localhost:4000/remove-product', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id:id })
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Product removed successfully");
        fetchInfo();
      } else {
        alert("Failed to remove product");
      }
    }).catch((error) => {
      console.error('Error removing product:', error);
    });
  }

  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product,index) => {
          return <>
          <div key={index} className="listproduct-format-main listproduct-format">
            <div><img src={product.image} alt={product.name} className="listproduct-product-icon" /></div>
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <div><img onClick={() => remove_product(product.id)} src={remove_icon} alt="Remove" className="listproduct-remove-icon" /></div>
          </div>
          <hr />
        </>
        })}

      </div>
    </div>
  )
}

export default ListProduct