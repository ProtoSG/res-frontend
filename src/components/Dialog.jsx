import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import lastVenta from "../hooks/lastVenta";
import useVentaPlato from "../hooks/useVentaPlato";
import { postVenta, putVenta } from "../services/venta";
import Button from "./Button";
import ButtonPay from "./ButtonPay";
import RealizarPago from "./RealizarPago";
import RegistrarPlato from './RegistrarPlato';
import Table from './Table';

export default function Dialog({mesa}){
    
    const [active, setActive] = useState(false);
    const { data: venta, loading: loadingVenta, error: errorVenta, fetchVenta} = lastVenta({mesa})
    const [total, setTotal] = useState(0)
    
    const id = venta?.id

    const { ventaPlato, loadingVentaPlato, errorVentaPlato, fetchVentaPlato } = useVentaPlato({id})
    

    useEffect(() => {
        if(venta?.estado === 0 || venta?.total === null || venta === null){
            setTotal(0)
        }
        else setTotal(venta?.total)
    },[venta])

    const handleOpen = async () => {
        const dialog = document.getElementById(`${mesa.id}`);
        if (dialog) {
            dialog.showModal();
            setActive(true);
            const id = mesa.id
            
            if(!venta?.estado) await postVenta({id})
            await fetchVenta()
        }
    }

    const handleClose = () => {
        const dialog = document.getElementById(`${mesa.id}`);
        if (dialog) {
            dialog.close();
            setActive(false)
        }
    }

    const handlePago = async(e) => {
        await putVenta({estado:false, id:venta.id, yape: 0})
      }

    return(
        <>
        <span className="text-xl font-bold  text-text-200">Total: {total}</span>
    
        <div className="flex w-full gap-4">
            <ButtonPay onClick={handlePago} name = {"Pagar"} bgColor />
            <Button onClick={handleOpen} name = {"Abrir"}/>
        </div>
        <dialog
            id={`${mesa?.id}`}
            className={`h-[80dvh] w-full bg-bg-200 rounded-2xl px-10 pt-3 pb-20 backdrop:bg-[rgba(25,25,25,0.9)]
            transition-all duration-300 ${active ? "opacity-100" : "opacity-0 "}
            overflow-hidden  
            `}>
            <span
                onClick={handleClose}
                className='absolute right-5 top-5 text-3xl hover:scale-150 text-text-200 hover:text-primary-200 hover:cursor-pointer transition-all'>
                    <IoClose/>
            </span>
            <Table
                venta={venta}
                ventaPlato={ventaPlato}
                loadingVentaPlato={loadingVentaPlato}
                errorVentaPlato={errorVentaPlato}
            />
            <RegistrarPlato venta={venta} fetchVenta={fetchVenta} fetchVentaPlato={fetchVentaPlato} /> 
            <RealizarPago venta={venta} fetchVenta={fetchVenta} fetchVentaPlato={fetchVentaPlato} handleClose={handleClose}/>
        </dialog>
        </>
    )
}
