import { Link } from "react-router-dom"

export default function LoginView() {
    return (
        <>
            <div>LoginView</div>

            <nav>
                <Link to="/auth/register">
                    Sign Up
                </Link>
            </nav>

        </>
    )
}