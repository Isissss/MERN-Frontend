import { Link } from "react-router-dom";

export function Error() {

    return <div>
        <h1>
            Page not found!

        </h1>

        <p>
            Got lost?
            <Link to="/">Go back to home</Link>
        </p>
    </div>
}