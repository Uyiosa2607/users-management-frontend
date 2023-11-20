import "./style.scss"

import { useRouteError } from "react-router-dom"

export default function ErrorHandler() {

    const error = useRouteError()

    return (

        <div className="errorHandler">

                <h1>Oops!</h1>

                <p>Sorry, an unexpected error has occured.</p>

                <i>{error.statusText || error.message}</i>

        </div>
    )
}