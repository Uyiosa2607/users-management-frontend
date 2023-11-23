import axios from "axios"
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pass, setPass] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
      setPassword(e.target.value)
    }

    const authCheck = (e) => {
        setPass(e.target.value)
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        const userData = {
            name : name,
            password : password,
            email : email
        }

        if(pass !== password) return toast.error("Passwords do not match");

        try {

            const response = await toast.promise(

                axios.post("https://users-management-backend-hncm.onrender.com/api/auth/register", userData),
                {
                    pending: 'Pending',
                    success: 'User Registered Successfully !',
                    error: 'failed'
                }
            )

            return navigate("/login")

        } catch (error) {

            console.log(error)
        }
    }

    return (
        <>

            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" />
            
            <form onSubmit={handleSubmit} className="registerForm">

                <h3 className="mainTitle">Hello Champ!</h3>

                <label htmlFor="name">Name*</label>

                <input value={name} onChange={handleName} placeholder="Fullname" type="text" id="name"  />

                <label htmlFor="name">Email*</label>

                <input type="email" value={email} onChange={handleEmail} placeholder="example@email.com" id="email"  />

                <label htmlFor="password">Password*</label>

                <input type="password" value={password} onChange={handlePassword} placeholder="enter password" id="password" />

                <input type="password" value={pass} onChange={authCheck} placeholder="Confirm password" /> 

                <Link to="/login" className="linkText">Already have an account, Sign in</Link>

                <button type="submit" className="regButton">Register</button>

            </form>


        </>
    )
}