import { useEffect, useState } from "react";
import { getLastVenta } from "../services/venta";

export default function lastVenta({mesa}) {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    async function fetchVenta(){
        try{
            setLoading(true);
            setError(null)
            const venta = await getLastVenta({mesa});
            setData(venta)
        } catch (e){
            setError(e.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {

        fetchVenta();

    }, [mesa])

    return {data, loading, error, fetchVenta}
}