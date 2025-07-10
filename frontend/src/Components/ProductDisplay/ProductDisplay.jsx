import { useState,useRef } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star.png'
import star_icon_empty from '../Assets/white-star.png'
import emailjs from '@emailjs/browser'
import Swal from 'sweetalert2'

const ProductDisplay = (props) => {

    const {product} = props;
    const form = useRef();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
    });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitOrder();

    emailjs
      .sendForm('service_pzwfdii', 'template_fhivvtd', form.current, {
        publicKey: 'j3_wZAOI5-qWNXK8Y',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error);
        },
      );

    form.current.reset();
    setFormData({ name: '', email: '', number: '' });
    setShowForm(false);
  };

  const submitOrder = async () => {
    try {
      let responsedata;
      await fetch(`${process.env.REACT_APP_API_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then((response) => response.json()).then((data) => responsedata = data);

      console.log("Signup response:", responsedata);
      if (responsedata.success) {
        Swal.fire({
          icon: 'success',
          title: 'Order Placed',
          text: responsedata.message,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Order Failed',
          text: responsedata.message,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Error placing order",
      });
    }
  };

  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>
            {/* <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div> */}
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
                    {product.description}
                    {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit nihil consequatur tempore incidunt mollitia molestias et delectus ipsa fugiat recusandae quam, omnis explicabo rerum enim doloribus, praesentium suscipit magni. Eum totam placeat, fugiat vel, exercitationem ipsa odit assumenda ut amet necessitatibus aliquid dolorum qui, sit modi non nisi sint soluta aperiam a inventore? Quia nesciunt voluptatibus quibusdam reprehenderit eos. Quae magnam repellat itaque praesentium, similique, voluptatem odio quasi voluptates hic repellendus dignissimos officiis culpa! Quae laudantium laboriosam vitae laborum voluptates vero enim explicabo sint, exercitationem facilis ullam modi voluptatum illum aut consectetur id? Nisi dignissimos dicta a fugiat nesciunt sequi. */}
                </div>
            </div>
            <div className="right-down">
                <div className="productdisplay-prices">
                    <div className="productdisplay-price-new">&#8377;{product.new_price}</div>
                    <div className="productdisplay-price-old">&#8377;{product.old_price}</div>
                </div>
                <button onClick={() => setShowForm(true)}>ORDER NOW</button>
            </div>
        </div>
        {showForm && (
        <div className="modal-overlay">
          <div className="modal-form">
            <h2>Enter Details</h2>
            <form ref={form} onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}   
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="number"
                placeholder="Phone Number"
                value={formData.number}
                onChange={handleInputChange}
                required
              />
              <input type="hidden" name="product_name" value={product.name} />
              <button type="submit" value="Send">Submit Order</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDisplay