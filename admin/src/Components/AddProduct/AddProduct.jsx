import {useState} from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload-area.png'

const AddProduct = () => {

    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: '',
        old_price: '',
        new_price: '',
        // category: 'Protein',
        image: ''
    });

    const imageHandler = (e) => {
        const file = e.target.files[0];
        setImage(file ? file : false);
    }

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setProductDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    }

    const addProductHandler = async () => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        console.log(image);
        formData.append('product', image);

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData
        }).then((response) => response.json())
        .then((data) => {
            responseData = data
        }).catch((error) => {
            console.error('Error uploading image:', error);
        });

        if (responseData.success) {
            console.log(responseData);
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/add-product', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product)
            }).then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert("Product added successfully");
                } else {
                    alert("Failed to add product");
                    console.error(data.message);
                }
            }).catch((error) => {
                console.error('Error adding product:', error);
            });
        }
    }

  return (
    <div className="add-product">
        <div className="addproduct-itemfield">
            <p>Product title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Enter product title'/>
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Enter old price'/>
            </div>
            <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Enter new price'/>
            </div>
        </div>
        {/* <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                <option value="Protein">Protein</option>
                <option value="Creatine">Creatine</option>
                <option value="Gainer">Gainer</option>
            </select>
        </div> */}
        <div className="addproduct-itemfield">
            <p>Product Description</p>
            <textarea value={productDetails.description} onChange={changeHandler} name='description' placeholder='Enter product description'></textarea>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} alt="" className='upload-area'/>
            </label>
            <input onChange={imageHandler} type="file" name='image' id="file-input" hidden />
        </div>
        <button onClick={() => {addProductHandler()}} className='addproduct-button'>ADD</button>
    </div>
  )
}

export default AddProduct