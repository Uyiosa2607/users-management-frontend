
import { useEffect, useState  } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Update() {

    const location = useLocation();

    const navigate = useNavigate()

    const { id } = location.state

    useEffect(()=> {
        getData()
    },[])

   async function getData(){

    const response = await axios.get(`/api/users/${id}`)

        if(response) {

            setEmail(response.data.email)
            setName(response.data.name)
        }
    
    }

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
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
            name: name,
            email: email,
            password: password
        }

        if(password === "") return toast.warn("Password field cannot be empty")

        try {

            const response = await axios.put(`/api/profile/update/${id}`,userData, { withCredentials: true });

            toast.success(response.data)

            navigate("/users")

        } catch(err){

            toast.warn("Something went wrong")
        }

    }

    return (

        <div className="update">


            <form onSubmit={handleSubmit} className="registerForm">

                <h3 className="mainTitle">Hello Champ!</h3>

                <label htmlFor="name">Name*</label>

                <input value={name} onChange={handleName} placeholder="Fullname" type="text" id="name" />

                <label htmlFor="name">Email*</label>

                <input type="email" value={email} onChange={handleEmail} placeholder="example@email.com" id="email" />

                <label htmlFor="password">Password*</label>

                <input type="password" value={password} onChange={handlePassword} placeholder="enter password" id="password" />

                <button type="submit" className="regButton">Save changes</button>

            </form>


        </div>
    )

}