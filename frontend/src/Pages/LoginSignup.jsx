import { useState } from 'react'
import './CSS/LoginSignup.css'
import Swal from 'sweetalert2'

const LoginSignup = () => {

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const login = async (e) => {
    console.log("Login function called", formData);
    try {
      let responseData;
      await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }).then((response) => response.json()).then((data) => responseData = data);
      console.log("Login response:", responseData);
      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/"); // Redirect to home page after successful login
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: "User logged in successfully",
        });
        setState("Login");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: responseData.message,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  const signup = async () => {
    console.log("Signup function called", formData);
    try {
      let responseData;
      await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }).then((response) => response.json()).then((data) => responseData = data);
      console.log("Signup response:", responseData);
      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/"); // Redirect to home page after successful signup
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: "User registered successfully",
        });
        setState("Login");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: responseData.message,
        });
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  }

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && <input name='username' onChange={changeHandler} type="text" placeholder='Enter your name' />}
          <input name='email' onChange={changeHandler} type="email" placeholder='Enter your email' />
          <input name='password' onChange={changeHandler} type="password" placeholder='Enter your password' />
        </div>
        <button onClick={() => (state === "Sign Up" ? signup() : login())}>Continue</button>
        {state === "Sign Up" ? (
          <>
            <p className='loginsignup-login'>Already have an account? <span onClick={() => setState("Login")}>Login here</span></p>
          </>
        ) : (
          <>
            <p className='loginsignup-login'>Create an Account ? <span onClick={() => setState("Sign Up")}>Click here</span></p>
          </>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id=''/>
          <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup