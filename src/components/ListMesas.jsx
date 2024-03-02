import UseMesa from "../hooks/useMesa";
import Dialog from "./Dialog";

export default function ListMesas() {
    
    const { mesas, loading, error } = UseMesa()

    return (
        <section className="overflow-hidden">
        {
            loading ? <p>Cargando...</p>
            :
            <div className='grid grid-cols-3 gap-10 '>
            {mesas.map((mesa) => (
                <div key={mesa.id} className='flex flex-col items-center justify-evenly w-full h-40 bg-bg-200 mt-4 text-text-100 px-4 rounded-3xl shadow-inner shadow-bg-300'>
                    <p className='text-2xl'>Mesa {mesa.name}</p>
                    
                    <Dialog mesa = {mesa}/>
                </div>
            ))}
            </div>
        }
        </section>
    );
}
