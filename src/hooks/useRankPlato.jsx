import { useEffect, useState } from "react";
import { getRankPlato } from "../services/plato";

export default function UseRankPlato(){
    const [platos, setPlatos] = useState([])
    const [loadingPlatos, setLoadingPlatos] = useState(false)
    const [errorPlatos, setErrorPlato] = useState(null)

    useEffect(() => {
        async function fetchPlatos(){
            try{
                setLoadingPlatos(true)
                setErrorPlato(null)
                const platos = await getRankPlato()
                setPlatos(platos)
            }catch(e){
                setErrorPlato(e.message)
            } finally{
                setLoadingPlatos(false)
            }
        }

        fetchPlatos()
    }, [])

    return {platos, loadingPlatos, errorPlatos}
}