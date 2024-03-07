import { useEffect, useState } from "react";
import { getVentaPlatoById } from "../services/venta-plato";

export default function useVentaPlato({ id }) {
    const [ventaPlato, setVentaPlato] = useState([]);
    const [loadingVentaPlato, setLoadingVentaPlato] = useState(false);
    const [errorVentaPlato, setErrorVentaPlato] = useState(null);

    const fetchVentaPlato = async () => {
        try {
            if(id === undefined) return;
            setLoadingVentaPlato(true);
            setErrorVentaPlato(null);
            const ventaPlato = await getVentaPlatoById({ id });
            setVentaPlato(ventaPlato);
        } catch (e) {
            setErrorVentaPlato(e.message);
        } finally {
            setLoadingVentaPlato(false);
        }
    };

    useEffect(() => {

        fetchVentaPlato();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return { ventaPlato, loadingVentaPlato, errorVentaPlato,  fetchVentaPlato };
}
