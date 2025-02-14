import { Link } from "react-router-dom"

export default function LoginView() {
    return (
        <>
            <h1 className="text-4xl text-white font-bold">Log In</h1>
            <nav className="mt-10">
            <p className="text-center text-white text-lg block">
                Don't have an account yet?&nbsp;
                <Link to="/auth/register">
                    Sign up here.
                </Link>
                </p>
            </nav>

        </>
    )
}