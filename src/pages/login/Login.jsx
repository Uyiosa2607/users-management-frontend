import { useState } from "react"
import axios from "axios"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAtom } from "jotai";
import { Link, useNavigate } from "react-router-dom";
import { userAtom } from "../../utils/Atom";


export default function Login() {

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

            const response = await axios.post("/api/login", data)

            if (response.status === 200) {

                toast.success('Login successfull')

                setUserId(response.data._id)

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