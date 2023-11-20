import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./src/components/header/Header";

export default function App() {

    return (

        <>
            <Header />

            <div className="container">


                <Outlet />

                <ToastContainer />

            </div>
            
        </>
        
    )


}


   