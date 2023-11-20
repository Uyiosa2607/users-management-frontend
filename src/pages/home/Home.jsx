import "./style.scss"
import { Link } from "react-router-dom"

function Home() {

    return (

        <div className="home">

            <h2>Welcome</h2>

            <div className="button-pannel">

                <Link to="/register" className="button"> Get started for free</Link>
                <Link to="/login" className="button">I already have an account</Link>
              
            </div>

        </div>
    )
}

export default Home;