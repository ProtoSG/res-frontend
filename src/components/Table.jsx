import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { putVenta } from "../services/venta";
import { deleteVentaPlato, updateVentaPlato } from '../services/venta-plato';

export default function Table({venta, ventaPlato, laodingVentaPlato, errorVentaPlato, fetchVenta, fetchVentaPlato}){

    const handleDelete = async(orden) => {
        const idVentaPlato = orden?.id
        const idPlato = orden?.plato.id
        await deleteVentaPlato({idVentaPlato, idPlato})
        await putVenta({estado: null, id: venta.id})
        fetchVenta()
        fetchVentaPlato()
    }
    
    const handleUpdate = async(orden) => {
        const idVentaPlato = orden?.id
        const cantidad = prompt('Ingrese la cantidad')
        try {
            if(cantidad === null) return
            if(cantidad === '') return alert('Ingrese un valor')
            if(isNaN(cantidad)) return alert('Ingrese un valor numerico')
            if(cantidad < 1) return alert('Ingrese un valor mayor a 0')
        } catch (e) {
            console.error(e)
        }
        const sub_total = orden?.plato.price * cantidad
        await updateVentaPlato({idVentaPlato, cantidad, sub_total})
        await putVenta({estado: null, id: venta.id})
        fetchVenta()
        fetchVentaPlato()
    }

    return(
        <div className="relative">
        <div>
            <ul className="flex text-3xl text-text-200 font-bold w-full justify-around py-10 border-b-4 border-text-200 ">
                <li>Cantidad</li>
                <li>Nombre</li>
                <li>Precio</li>
                <li>Sub Total</li>
                <li>Acciones</li>
            </ul>
        </div>
         <table className="w-full text-text-200 text-2xl ">
            {/* <div className="inline-block overflow-y-scroll max-h-[620px] w-full "> */}
            <tbody className="overflow-y-scroll h-[620px] w-full inline-block">
                {
                    laodingVentaPlato ? <p>Cargando</p> 
                    :errorVentaPlato ? <p>Error...</p>
                    :ventaPlato.map((orden, index) => (
                        <tr key={index} className="border-t-2 border-text-200/50 text-center flex items-center justify-around">
                            <td className="py-4 ">{orden.cantidad}</td>
                            <td>{orden.plato.name}</td>
                            <td>{orden.plato.price}</td>
                            <td>{orden.sub_total}</td>
                            <td>
                                <span onClick={() => handleDelete(orden)} className="mr-4 text-red-600 hover:text-red-400 text-2xl hover:scale-150 transition-all cursor-pointer inline-block "><MdDelete /></span>
                                <span onClick={() => handleUpdate(orden)} className="ml-4 text-green-600 hover:text-green-400 text-2xl hover:scale-150 transition-all cursor-pointer inline-block "><FaPen /></span>    
                            </td>
                        </tr>
                    ))
                }

            </tbody>
            {/* </div> */}
        </table>
       </div>
    )
}