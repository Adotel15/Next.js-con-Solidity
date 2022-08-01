
import { useState } from 'react'
import Temporizador from './Temporizador'
import Styles from "../styles/FuncionesContador.module.css"

const FuncionesContador = ({ contrato }) => {

    const [contador, setContador] = useState(null)

    const getContador = async () => {
        setContador(await contrato.methods.getContador().call())

        setTimeout(() => {
            setContador(null)
        }, 6000);
    }

    const aumentarContador = async () => {
        try{
            const cuenta = await window.web3.eth.getAccounts()
            await contrato.methods.aumentarContador().send({from: cuenta[0]})

        } catch (error) {
            console.log(error)
        } finally {
            console.log("Llegamos al finally")
        }
    }

    
  return (
    <div>
         <div>
                <h3>Función getContador</h3>

                <button
                    type = "button"
                    onClick = {getContador}
                >
                    Ver Contador
                </button>

                {contador === null
                ?
                null : 
                (<div className = {Styles.contador}>
                    <Temporizador
                        tiempo = {6}
                    />
                    <p> {contador} </p>
                </div>)
                }

            </div>

            <div>
                <h3>Función aumentar Contador</h3>

                <button 
                    type = "button"
                    onClick = {aumentarContador}
                >Aumentar Contador</button>
            </div>
      
    </div>
  )
}

export default FuncionesContador
