import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import { login } from '../services/login'

export default function Login({setUser}) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleChange = (e) =>{
        const {name, value} = e.target;
        if(name === 'username') setUsername(value);
        if(name === 'password') setPassword(value);
    }

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const loggedInUser = await login(username, password)
            if(loggedInUser){
                setUser(loggedInUser)
                navigate('/')
           }

        } catch (e) {
            console.error(e)
        }
    }

  return (
    <section className='min-h-dvh w-full flex justify-center items-center'>
        <div className='bg-bg-200 w-[500px] py-20 rounded-2xl shadow-2xl shadow-black px-10 text-text-200'>
            <form onSubmit={handleSubmit} className='flex gap-5 flex-col'>
                <h1 className='text-center text-6xl mb-8'>LOGIN</h1>
                <Input
                    placeholder={"Username..."}
                    value={username}
                    onChange={handleChange}
                    name={'username'}
                    type={'text'}
                />
                <Input
                    placeholder={"Password..."}
                    value={password}
                    onChange={handleChange}
                    name={'password'}
                    type={'password'}
                />
                <Button name={"Ingresar"} />
            </form>
        </div>
    </section>
  )
}
