import { useEffect, useState } from 'react'
import { getLastPlato } from '../services/plato'

export default function lastPlato() {
    const [plato, setPlato] = useState({})
    const [loadingPlato, setLoadingPlato] = useState(false)
    const [errorPlato, setErrorPlato] = useState(null)

    useEffect(() =>{
        async function fetchPlato(){
            try{
                setLoadingPlato(true)
                setErrorPlato(null)
                const platoData = await getLastPlato()
                setPlato(platoData)
            }catch(e){
                setErrorPlato(e.message)
            }finally{
                setLoadingPlato(false)
            }
        }

        fetchPlato()
    }, [])

    return {plato, loadingPlato, errorPlato}
}
