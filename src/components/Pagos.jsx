import React from 'react'
import UseTotal from '../hooks/useTotal'

export default function Pagos() {

  const {total, loadingTotal, errorTotal} = UseTotal()

  return (
    <section className='shadow-inner text-2xl text-text-200 py-6 items-center bg-bg-200 row-span-1 rounded-2xl flex justify-evenly'>
        {
          loadingTotal ? (<p>Cargando...</p>)
          : errorTotal ? (<p>Error al cargar los datos</p>)
          : (
            <>
            <div>
                <h3>Efectivo:</h3>
                <span className='font-semibold text-3xl'>$ {(total?.total - total?.yape).toFixed(2)}</span>
            </div>
            <div>
                <h3>Yape:</h3>
                <span className='font-semibold text-3xl'>$ {total?.yape.toFixed(2)}</span>
            </div>
            </>
          )
        }
    </section>
  )
}
