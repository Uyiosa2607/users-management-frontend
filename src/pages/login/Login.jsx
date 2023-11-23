import { useState } from "react"
import axios from "axios"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAtom } from "jotai";
import { Link, useNavigate } from "react-router-dom";
import { userAtom } from "../../utils/Atom";


export default function Login() {

    // eslint-disable-next-line no-unused-vars
    const [userId, setUserId] = useAtom(userAtom);


    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const processLogin = async (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password
        }

        try {

            const response = await toast.promise(

                axios.post("https://users-management-backend-hncm.onrender.com/api/auth/login", data, {withCredentials:true}),
                {
                    pending: 'Pending',
                    success: 'Successfully Loged in',
                    error: 'Invalid credentials'
                }
            )
            if (response.status === 200) {

                setUserId(response.data._id)

                localStorage.setItem("token",response.data.accessToken)

                navigate("/dashboard");

            } else {
                toast.error("Invalid Credentials")
            }

        } catch (error) {
            console.error(error)
        }
    }

    return (

        <div className="container">

            <form onSubmit={processLogin} className="loginForm">

                <h3 className="mainTitle">Hello Champ!</h3>

                <label htmlFor="email">Email</label>

                <input value={email} onChange={handleEmail} placeholder="email" id="email" type="email" />

                <label htmlFor="password">Password</label>

                <input value={password} onChange={handlePassword} id="password" placeholder="enter password" type="password" />

                <Link to="/register" className="linkText">Create account</Link>

                <button type="submit" className="loginButton">Login</button>

            </form>

        </div>
    )
}