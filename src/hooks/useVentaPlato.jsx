import { useEffect, useState } from "react";
import { getVentaPlatoById } from "../services/venta-plato";

export default function useVentaPlato({id}) {
    const [ventaPlato, setVentaPlato] = useState([])
    const [loadingVentaPlato, setLoadingVentaPlato] = useState(false)
    const [errorVentaPlato, setErrorVentaPlato] = useState(null)
    useEffect(() => {
        async function fetchVentaPlato(){
            try{
                setLoadingVentaPlato(true)
                setErrorVentaPlato(null)
                const ventaPlato = await getVentaPlatoById({id})
                setVentaPlato(ventaPlato)
            }catch(e){
                setErrorVentaPlato(e.message)
            }finally{
                setLoadingVentaPlato(false)
            }
        }

        const intervalId = setInterval(() =>{
            fetchVentaPlato()
        }, 500)

        return () => clearInterval(intervalId)
    }, [id])

    return { ventaPlato, loadingVentaPlato, errorVentaPlato}
}