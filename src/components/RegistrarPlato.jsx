import { useState } from "react";
import { postPlato } from "../services/plato";
import { putVenta } from "../services/venta";
import { postVentaPlato } from "../services/venta-plato";
import Button from "./Button";
import Input from "./Input";

export default function RegistrarPlato({venta}){

    const [cantidad, setCantidad] = useState('')
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if( name === "nombre" ) setNombre(value);
        if( name === "precio" ) setPrecio(value);
        if( name === "cantidad" ) setCantidad(value);
    }
    
    const query = {
        name : nombre,
        price : precio
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        try{
            if(query.name === "" || query.price === "") return

            const plato_id = await postPlato({query})
            const venta_id = venta.id
            const sub_total = parseInt(cantidad) * parseFloat(precio)
            
            await postVentaPlato({venta_id, plato_id, cantidad, sub_total})
            
            await putVenta({estado: null, id: venta.id})
            
            setNombre('');
            setPrecio('');
            setCantidad('');
        }catch (e){
            console.error(e)
        }

    }

    return(
        <section className="gap-5 mt-4">
            <form onSubmit={handleSubmit} className="flex gap-5  w-full">
                <Input
                    type = {"text"}
                    name = {"cantidad"}
                    placeholder={"Cantidad..."}
                    value={cantidad}
                    onChange={handleChange}
                />
                <Input
                    type = {"text"}
                    name={"nombre"}
                    placeholder={"Nombre..."}
                    value = {nombre}
                    onChange={ handleChange }
                    />
                <Input
                    type = {"text"}
                    name = {"precio"}
                    placeholder={"Precio..."}
                    value = {precio}
                    onChange={ handleChange } 
                />
                
                <Button name={"Agregar"} />
            </form>
        </section>
    )
}