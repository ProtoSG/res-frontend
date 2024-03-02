import React from 'react'
import UseTotal from '../hooks/useTotal'

export default function BalanceTotal() {

    const { total, loadingTotal, errorTotal} = UseTotal()

  return (
    <section className='py-8 px-8 bg-gradient-to-r from-primary-100 to-primary-200 row-span-2 rounded-2xl shadow-inner'>
        {
            loadingTotal ? (<p>Cargando...</p>)
            :(
                <>
                <h2 className='text-accent-200 text-2xl text-bold mb-10 font-semibold'>Balance Total</h2>
                    <div className='h-[80%] flex justify-center items-center'>
                        <p className='text-3xl text-primary-300 '>$
                            <span className='ml-4 text-[6rem] text-primary-300 text-center'>
                                {total?.total.toFixed(2)}
                            </span>
                        </p>
                    </div>
                </>
            )
        }
    </section>
  )
}
