import React, { useRef } from 'react';
import './NewsLetter.css';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';

const NewsLetter = () => {
  const form = useRef();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const email = form.current.email.value;

    if (!email) {
      Swal.fire({
        icon: 'error',
        title: 'Subscription Failed',
        text: "Please enter your email address.",
      });
      return;
    }

    const success = await addEmail(email);

    // ✅ Send email using emailjs
    if(success) 
    {
      emailjs.sendForm('service_pzwfdii', 
                       'template_6iv27or',
                        form.current, 
      { publicKey: 'j3_wZAOI5-qWNXK8Y' })
      .then(
        () => {
          console.log('EmailJS SUCCESS!');
        },
        (error) => {
          console.log('EmailJS FAILED...', error.text);
        }
      );
    }
  };

  const addEmail = async (email) => {
    let Success = false;
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const responseData = await response.json();

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Subscription Successful',
          text: responseData.message || "Thank you for subscribing!",
        });
        Success = true;
      } else if (response.status === 400) {
        Swal.fire({
          icon: 'info',
          title: 'Already Subscribed',
          text: responseData.message || "You are already subscribed.",
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Subscription Failed',
          text: responseData.message || "Subscription failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error during subscription:", error);
      Swal.fire({
        icon: 'error',
        title: 'Subscription Failed',
        text: "An error occurred. Please try again later.",
      });
      return false;
    }
    return Success;
  };

  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <form ref={form} onSubmit={handleSubscribe}>
        <input type="email" name="email" placeholder='Your Email Address' />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
};

export default NewsLetter;
