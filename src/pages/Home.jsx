import ListMesas from '../components/ListMesas';
import RegisterMesa from '../components/RegisterMesa';

export default function Home() {
  return (
      <section className='w-full max-h-[90dvh] flex flex-col justify-between'>
        <ListMesas/>
        <RegisterMesa/>
    </section>
  )
}
