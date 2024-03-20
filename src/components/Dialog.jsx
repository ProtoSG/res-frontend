import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import useLastVenta from "../hooks/useLastVenta";
import useVentaPlato from "../hooks/useVentaPlato";
import { postVenta, putVenta } from "../services/venta";
import Button from "./Button";
import ButtonPay from "./ButtonPay";
import RealizarPago from "./RealizarPago";
import RegistrarPlato from './RegistrarPlato';
import Table from './Table';

export default function Dialog({mesa}){
    
    const [active, setActive] = useState(false);
    const { data: venta, fetchVenta} = useLastVenta({mesa})
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

    const handlePago = async() => {
        await putVenta({estado:false, id:venta.id, yape: 0})
        fetchVenta()
        fetchVentaPlato()
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
            className={` w-full bg-bg-200 rounded-2xl px-10 py-3  backdrop:bg-[rgba(25,25,25,0.9)]
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
                fetchVenta={fetchVenta}
                fetchVentaPlato={fetchVentaPlato}
            />
            <div className="text-center border-t-4  border-primary-100  text-primary-100 px-20 flex justify-between items-center">
                    <span className="text-2xl py-4 font-semibold" colSpan="2">Total: </span>
                    <span className=" text-3xl font-bold" >S/ {venta?.total === null ? 0 : venta?.total} </span>
            </div>
            <RegistrarPlato venta={venta} fetchVenta={fetchVenta} fetchVentaPlato={fetchVentaPlato} />
            <RealizarPago venta={venta} fetchVenta={fetchVenta} fetchVentaPlato={fetchVentaPlato} handleClose={handleClose}/>
        </dialog>
        </>
    )
}
