const postPlato = async ({query}) => {
    try{
        const data = {
            nombre : query.name,
            precio : query.price
        }

        const response = await fetch("http://localhost:3000/plato", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(!response.ok){
            throw new Error("Hubo un problema al enviar la  solicitud " + response.status )
        }

        const responseData = await response.json();

        console.log('Respuesta del servidor:', responseData.response);

        const  {id} = responseData;
        
        return id;

    } catch (e){
        console.error(e)
        throw e
    }
}


//Por el momenot inservible
const getLastPlato = async () => {
    try{
        const response = await fetch("http://localhost:3000/plato/last")
        
        if(!response.ok){
            throw new Error('Hubo un problema en la solicitud: ' + response.status);
        }

        const plato = await response.json()

        if(plato.length > 0 ){
            return{
                id : plato[0].plato_id,
                name : plato[0].plato_name,
                price : plato[0].plato_precio
            }
        }

        return null;
    }catch (e){
        console.error(e)
        throw e
    }
}

const getRankPlato = async () => {
    try{
        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 5);

        const data = {
            date: fechaActual.toISOString().slice(0, 10),
        }

        const response =  await fetch(`http://localhost:3000/plato/rank/${data.date}`)

        if(!response.ok){
            throw new Error('Hubo un problema en la solicitud: ' + response.status);
        }

        const platos = await response.json()

        return platos?.map(plato =>({
            name: plato.plato_name,
            count : plato.cantidad_total
        }))

    } catch (e){
        console.error(e);
        throw e
    }
}

export { getLastPlato, getRankPlato, postPlato };
