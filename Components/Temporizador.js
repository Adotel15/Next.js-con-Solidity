
import { useState, useEffect } from "react"

const Temporizador = ({tiempo}) => {

    const [seconds, setSeconds ] =  useState(tiempo);

    useEffect(()=> {

        if(seconds > 0) setTimeout(() => {
            setSeconds(seconds- 1);
        }, 1000);

           
    },[seconds])

  return (
    <div>
      <p>{`Quedan ${seconds} segundos!`}</p>
    </div>
  )
}

export default Temporizador
