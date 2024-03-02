import React from 'react'
import BalanceTotal from '../components/BalanceTotal'
import Grafica from '../components/Grafica'
import Pagos from '../components/Pagos'
import RankPlatos from '../components/RankPlatos'

export default function Dashboard() {
  return (
    <section className='w-full grid grid-cols-2 grid-row-5 gap-4'>
      <BalanceTotal/>
      <Grafica/>
      <RankPlatos/>
      <Pagos/>
    </section>
  )
}
