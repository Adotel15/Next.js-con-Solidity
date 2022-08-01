
import { useState } from "react"
import Temporizador from "./Temporizador"
import Styles from "../styles/FuncionesTexto.module.css"

const FuncionesTexto = ({ contrato }) => {

  const [texto, setTexto] = useState("")
  const [nuevoTexto, setNuevoTexto] = useState("")

  const getTextoContrato = async () => {

    setTexto(await contrato.methods.getTextoContrato().call())

    setTimeout(() => {
        setTexto("")
    }, 5000);
  }


  const modificarTextoContrato = async (nuevoString) => {
      try{
          const cuenta = await window.web3.eth.getAccounts()
          await contrato.methods.modificarTextoContrato(nuevoString).send({from: cuenta[0]})

      } catch (error) {
          console.log(error)
      } finally {
          console.log("Llegamos al finally")
      }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    modificarTextoContrato(nuevoTexto)
    setNuevoTexto("")
  }

    
  return (
    <div>
      <div>
          <h3>Función getTextoContrato</h3>
          <button
            type = "button"
            onClick = {getTextoContrato}
          >
            Funcion getTextoContrato
          </button>

                {texto === "" ? null : 
                (<div className = {Styles.textoContrato}>
                    <Temporizador tiempo = {5}/>
                    <p> {texto} </p>
                </div>) }
      </div>

      <div className = {Styles.formulario}>
          <h3>Función modificarTextoContrato</h3>

          <form
              onSubmit = { handleSubmit}
          >
            <label>Introduce el Nuevo Texto del Smart Contract</label>
            <input
                className = {Styles.texto}
                type = "text"
                placeholder = 'Texto para el SmartContract'
                id = "textoNuevo"
                value = {nuevoTexto}
                onChange = { (e) => setNuevoTexto(e.target.value)}
              />

            <input
                className = {Styles.boton}
                type = "submit"
                value = "Modificar Texto"
            />
          </form>
      </div>
      
    </div>
  )
}

export default FuncionesTexto
