const postVentaPlato = async ({venta_id, plato_id, cantidad, sub_total}) => {
    try{
        const data = {venta_id, plato_id, cantidad, sub_total}

        const response = await fetch("http://localhost:3000/venta-plato", {
            method: "POST",
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(!response.ok){
            throw new Error("Hubo un problema al enviar la  solicitud " + response.status )
        }

        const responseData = await response.json();
        console.log('Respuesta del servidor:', responseData);
    }catch(e){
        console.error(e)
        throw e
    }
}

const getVentaPlatoById = async ({id}) =>{
    try{
        const response = await fetch(`http://localhost:3000/venta-plato/${id}`)

        if (!response.ok) {
            throw new Error('Hubo un problema en la solicitud: ' + response.status);
        }
        const data = await response.json();
        return data?.map(ventaPlato => ({
            id : ventaPlato.venta_plato_id,
            venta_id : ventaPlato.venta_id,
            plato : {
                id : ventaPlato.plato.plato_id,
                name : ventaPlato.plato.plato_name,
                price : ventaPlato.plato.plato_price
            },
            cantidad : ventaPlato.cantidad,
            sub_total : ventaPlato.sub_total
        }));
    }catch (e){
        console.error(e)
        throw e
    }
}

const deleteVentaPlato = async({idVentaPlato, idPlato}) => {
    try{
        const data = {idPlato}
        const response = await fetch(`http://localhost:3000/venta-plato/${idVentaPlato}`, {
            method: 'DELETE',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(!response.ok){
            throw new Error('Error al eliminar el registro de VentaPlato');
        }

        const res = await response.json();
        console.log(res)
    }catch(e){
        console.error(e)
        throw e
    }
}

export { deleteVentaPlato, getVentaPlatoById, postVentaPlato };

