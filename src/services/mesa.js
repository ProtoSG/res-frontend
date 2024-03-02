const getMesas = async () => {
    try {
        const response = await fetch('http://localhost:3000/mesa');

        if (!response.ok) {
            throw new Error('Hubo un problema en la solicitud: ' + response.status);
        }
        const data = await response.json();
        
        return data?.map(mesa => ({
            id: mesa.mesa_id,
            name : mesa.mesa_name
        }))

    } catch (error) {
        console.error(error);
        throw error
    }
}

const putMesa = async ({query}) => {
    try{
        const data = { name: query}
        const response = await fetch('http://localhost:3000/mesa', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(!response.ok){
            throw new Error("Hubo un problema al enviar la  solicitud " + response.status );
        }

        const responseData = await response.json();
        console.log('Respuesta del servidor:', responseData);
    }catch (e){
        console.error(e)
        throw e
    }
}

export { getMesas, putMesa };
