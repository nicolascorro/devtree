import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { isAxiosError } from "axios";
import { toast } from "sonner";

import { RegisterForm } from "../types";
import ErrorMessage from "../components/ErrorMessage";
import api from "../config/axios";

export default function RegisterView() {
    const initialValues = {
        name: '',
        email: '',
        handle: '',
        password: '',
        password_confirmation: ''
    }
    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm<RegisterForm>({ defaultValues: initialValues })
    const password = watch('password')

    const handleRegister = async (formData: RegisterForm) => {
        try {
            const { data } = await api.post(`/auth/register`, formData);
            toast.success(data) // show the success response as a banner

            reset() // to empty all form data
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.error);
            }
        }
    }
    return (
        <>
            <h1 className="text-4xl text-white font-bold">Create An Account</h1>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
            >
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="name" className="text-2xl text-slate-500">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="e.g. Marshall"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('name', {
                            required: 'Your name is mandatory.'
                        })}
                    />
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="e.g. marshall@email.com"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('email', {
                            required: 'Your email is mandatory.'
                        })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="handle" className="text-2xl text-slate-500">handle</label>
                    <input
                        id="handle"
                        type="text"
                        placeholder="e.g. slimshady99"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('handle', {
                            required: 'handle is mandatory.'
                        })}
                    />
                    {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="********"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password', {
                            required: 'Password is mandatory.',
                            minLength: {
                                value: 8,
                                message: "Minimum 8 characters"
                            }
                        })}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>

                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repeat password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="********"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password_confirmation', {
                            required: 'Repeating password is mandatory.',
                            validate: (value) => value === password || 'Passwords do not match'
                        })}
                    />
                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Create account'
                />
            </form>

            <nav className="mt-10">
                <p className="text-center text-white text-lg block">
                    Already have an account?&nbsp;
                    <Link to="/auth/login">Log in here.</Link>
                </p>
            </nav>

        </>
    )
}
