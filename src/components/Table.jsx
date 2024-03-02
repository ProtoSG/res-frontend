import { MdDelete } from "react-icons/md";
import useVentaPlato from "../hooks/useVentaPlato";
import { putVenta } from "../services/venta";
import { deleteVentaPlato } from "../services/venta-plato";

export default function Table({venta}){

    const id = venta?.id
    const { ventaPlato, laodingVentaPlato, errorVentaPlato } = useVentaPlato({id})
    
    const handleDelete = async(orden) => {
        const idVentaPlato = orden?.id
        const idPlato = orden?.plato.id
         await deleteVentaPlato({idVentaPlato, idPlato})
         await putVenta({estado: null, id: venta.id})
    }

    return(
       <div className="relative h-[80%]">
         <table className="w-full text-text-200 text-2xl ">
            <thead>
                <tr className="border-b-2 border-primary-100">
                    <th className="py-8">Cantidad</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody>
                {
                    laodingVentaPlato ? <p>Cargando</p> 
                    :ventaPlato.map((orden, index) => (
                        <tr key={index} className="border-t-2 text-center">
                            <td className="py-4">{orden.cantidad}</td>
                            <td>{orden.plato.name}</td>
                            <td>{orden.plato.price}</td>
                            <td><span onClick={() => handleDelete(orden)} className="text-red-600 hover:text-red-400 text-2xl hover:scale-150 transition-all cursor-pointer inline-block "><MdDelete /></span></td>
                        </tr>
                    ))
                }
            </tbody>
            <tfoot>
                <tr className="text-center border-t-4  border-primary-100 absolute w-full bottom-0 flex justify-between items-center">
                    <td className="text-left py-4" colSpan="2">Total: </td>
                    <td className="pr-[10%] text-3xl font-bold" >S/ {venta?.total === null ? 0 : venta?.total} </td>
                </tr>
            </tfoot>
        </table>
       </div>
    )
}