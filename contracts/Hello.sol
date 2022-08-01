// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Hello {

    string public textoContrato;
    uint contador = 0;

    constructor () public {
        textoContrato = "Este es el texto inicial del contrato";
    }

    function getTextoContrato () public view returns (string memory) {
        return textoContrato;
    }

    function modificarTextoContrato(string memory _modificador) public {
        textoContrato = _modificador;
    }

    function getContador() public view returns(uint){
        return contador;
    }

    function aumentarContador() public {
        ++contador;
    }


}