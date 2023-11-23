/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react"
import axios from "axios";
import avatar from "../../assets/profile_picture.png"
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "./style.scss"

export default function Users() {

    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get("https://users-management-backend-hncm.onrender.com/api/users", { withCredentials: true });
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    async function handelEdit(e) {

        const documentId = e.target.getAttribute("user-data-id");

        try {

            const response = await axios.get(`https://users-management-backend-hncm.onrender.com/api/edit/${documentId}`, {withCredentials: true});

            if(response.status === 200) {

                navigate("/update", { state: { id: documentId } })
            }

            if(response.status === 203) {

                toast.warn("You are not allowed")
                
            }
            
        } catch(error) {
            console.log(error)
        }

    }

    async function handleDel(e) {

        const id = e.target.getAttribute("user-data-id");
       
        try {

            const response = await axios.delete(`https://users-management-backend-hncm.onrender.com/api/remove/${id}`,{withCredentials:true})

            if (response.status === 200) {

                toast.success(response.data);

                fetchData()

            } else {
                toast.warn("You are not allowed to do that")
            }

        } catch (error) {

            console.log(error)

        }

    }

    return (

        <div className="container">


            <Link  to="/dashboard" className="profile-btn">Profile</Link>

            <table>
                <thead>
                    <tr>
                        <th colSpan={2}>NAME</th>
                        <th >EMAIL</th>
                        <th colSpan={2}></th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((user) => (
                        <tr key={user._id} className="data-row">
                            <td>
                                <img className="user-img" src={avatar} />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td><button user-data-id={user._id} onClick={handelEdit} className="edit-btn btn">Edit</button></td>
                            <td><button user-data-id={user._id} onClick={handleDel} className="del-btn btn">Del</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}