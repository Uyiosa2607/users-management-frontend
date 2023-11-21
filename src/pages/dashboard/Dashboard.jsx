import icon from "../../assets/profile_picture.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { userAtom } from "../../utils/Atom";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import Cookies from "js-cookie";


export default function Dashboard() {

    const navigate = useNavigate()

    const [userId] = useAtom(userAtom)


    function handleUsers() {
        navigate("/users");
    }

    function editProfile() {
        navigate("/update-profile")
    }

    function logOut() {
        Cookies.remove("token")
        toast.warn("Logged out!")
        navigate("/login")
    }


   const [data, setData] = useState("")

    const fetchData = async () => {

        try {

            const response = await axios.get(`https://users-management-backend-hncm.onrender.com/api/users/${userId}`, { withCredentials: true });

            setData(response.data)

        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };

    useEffect(() => {
       
        fetchData(); 

    }, []);

    return (

        <div className="container">
            

            <h3 className="dashText">Welcome!</h3>
            <div className="imageWrapper">

                <img src={icon} alt="profile picture" className="icon" />

            </div>

            <p className="name-style centerText">{data.name}</p>
            <p className="centerText">{data.email}</p>

            <div className="buttonContainer">

                <button onClick={handleUsers} className="profileButton">All users</button>
                <button onClick={editProfile} className="profileButton">Edit profile</button>
                <button  onClick={logOut} className="profileButton">Logout</button>

            </div>

        </div>
    )

}
