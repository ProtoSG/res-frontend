import { useEffect, useState } from "react"
import { getTotal } from "../services/venta"


export default function UseTotal(){
    const [total, setTotal] = useState()
    const [loadingTotal, setLoadingTotal] = useState(false)
    const [errorTotal, setErrorTotal] = useState(null)

    useEffect(() =>{
        async function fetchTotal() {
            try{
                setLoadingTotal(true)
                setErrorTotal(null)
                const total = await getTotal()
                setTotal(total)
            } catch (e){
                setErrorTotal(e.message)
            } finally{
                setLoadingTotal(false)
            }
        }

        fetchTotal()
    }, [])

    return { total, loadingTotal, errorTotal}
}