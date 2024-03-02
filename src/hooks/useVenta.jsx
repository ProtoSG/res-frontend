import { useEffect, useState } from 'react'
import { getDays } from '../services/venta'

export default function UseDays() {

    const [dayData, setVentas] = useState([])
    const [loadingDayData, setLoadingVentas] = useState(false)
    const [errorDayData, setErrorVentas] = useState(null)

    useEffect(() =>{
        async function fetchVentas(){
            try{
                setLoadingVentas(true)
                setErrorVentas(null)
                const ventas = await getDays();
                setVentas(ventas)
            }catch (e) {
                setErrorVentas(e.message)
            }finally{
                setLoadingVentas(false)
            }
        }

        fetchVentas()
    }, [])

    return { dayData, loadingDayData, errorDayData}
}
