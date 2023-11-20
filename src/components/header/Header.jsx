import "./style.scss"
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import {toast, ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function Header() {

    const navigate = useNavigate();

    const token = !!Cookies.get("token");

    function handleLogout() {

        Cookies.remove("token")
        toast.error("Logged Out!!")
        navigate("/login")
    }

    function handleLogin() {
        navigate("/login")
    }

    return (
        <>
            <ToastContainer />
            <header>
                <Link className="link" to="/">
                    <h2 className="logo">WELCOME</h2>
                </Link>
                {token ? <button onClick={handleLogout}>Logout</button> : <button onClick={handleLogin}>Login</button>}
            </header>
        </>
    )
}

export default Header