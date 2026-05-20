import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post("http://localhost:3002/auth/login", { email, password })

            localStorage.setItem('token', res.data.token || ' ');

            navigate("/profile")
        } catch (err) {
            alert(err.response?.data?.message || "Login failed")
        }
    }

    return (
        <form onSubmit={handleLogin} className='w-[600px] mx-auto my-10'>
            <div class="mb-6">
                <label for="email" value={email} onChange={(e) => setEmail(e.target.value)} class="block mb-2.5 text-sm font-medium text-heading">Email address</label>
                <input type="email" id="email" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="john.doe@company.com" required />
            </div>
            <div class="mb-6">
                <label for="password" value={password} onChange={(e) => setPassword(e.target.value)} class="block mb-2.5 text-sm font-medium text-heading">Password</label>
                <input type="password" id="password" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="•••••••••" required />
            </div>
            <button type="submit" class="text-white bg-blue-500 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Submit</button>
        </form>
    )
}

export default Login
