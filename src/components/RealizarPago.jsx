import React, { useState } from 'react'
import { putVenta } from '../services/venta'
import Button from './Button'
import Input from './Input'

export default function RealizarPago({venta}) {
  
  const [query, setQuery] = useState(0)

  const handleSubmit = async(e) => {
    await putVenta({estado:false, id:venta.id, yape: query})
  }

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  return (
    <div className='mt-8'>
        <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-10'>
          <label className='text-2xl text-text-200 font-medium' >
            Pagar con Yape:
            <Input
              value={query}
              onChange={handleChange}
              placeholder={"Monto de yape..."}
              type={"text"}
            />
          </label>
          <Button name={"Pagar"}/>
        </form>
    </div>
  )
}
