import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

export default function Layout({user}) {
  return (
    <div className='flex px-8 gap-12 w-full'>
        <Header user = {user} />
        <hr className='border-[1px] h-[90dvh] border-bg-300 '/>
        <Outlet />
    </div>
  )
} 
