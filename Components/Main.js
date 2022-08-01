
import React from 'react'
import Web3 from 'web3'
import { useState } from 'react'
import Contrato_Hello from '../build/contracts/Hello.json'
import FuncionesTexto from './FuncionesTexto'
import FuncionesContador from './FuncionesContador'
import Styles from "../styles/Main.module.css"

const Main = () => {

    const [account, setAccount] = useState({})
    const [contrato, setContrato] = useState({})
    const [direccion, setDireccion] = useState('')

    const loadWeb3 = async () => {
            
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            // eth request sirve para que si no has iniciado sesion en Metamask te lo pida
            await ethereum.send('eth_requestAccounts');
        }

        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
            alert("Window.web3")
        }

        else {
            window.alert('No hay ninguna wallet conectada');
        }
    }

    const loadBlockchainData = async () => {
    
        const web3 = window.web3;

        const accounts = await web3.eth.getAccounts();
        
        setAccount(accounts[0].toLocaleString());
        
        const networkData = Contrato_Hello.networks['5777'];
        
        if(networkData) {
            const abi = Contrato_Hello.abi;
            const address = networkData.address;
            const contract = new web3.eth.Contract(abi, address);
            setDireccion(contract._address)
            setContrato(contract);
        } else {
            window.alert('No se ha desplegado el contrato');
        }
    }

    const ConectarWallet = async () => {
        await loadWeb3();
        await loadBlockchainData();   
    }

   
    return (
        <div className = {Styles.contenedor}>
            <h1 className = {Styles.titulo}>Proyecto de Prueba para conectar React con Web3/Truffle/Solidity/Ganache</h1>

            <div className = {Styles.contenido}>
            <div>
                <h2>Datos de la Wallet y el Smart Contract</h2>
                {account.toString() !== '[object Object]' ? (<p>Wallet conectada : {account.toString()}</p>) : (<p> Wallet no conectada </p>)}
            
                <p>Direccion contrato: {direccion} </p>

                <button
                    type = "button"
                    onClick = {ConectarWallet}
                >
                    Conectar Metamask
                </button>
            </div>

            <div>
                <h2>Llamar a las funciones del Smart Contract</h2>

                <FuncionesTexto
                    contrato = {contrato}
                />

                <FuncionesContador
                    contrato = {contrato}
                />
            </div>
            </div>
        </div>
    )
}



export default Main
