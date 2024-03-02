import React from 'react'

export default function Input({value, onChange, placeholder, type, name}) {
  return (
    <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name = {name || ""}
        className=' px-4 py-6 rounded-2xl w-full bg-bg-300 text-text-100 text-xl placeholder:text-text-200'
    />
  )
}
