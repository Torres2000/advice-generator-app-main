//importando los componentes necesarios de react
import React, { useState, useEffect } from "react";
import axios from "axios";
//Importando los estilos css para nuestro proyecto
import "./App.css";

//Importando las img para la version de desktop y mobile
import dividerDesktop from "./assets/pattern-divider-desktop.svg";
import dividerMobile from "./assets/pattern-divider-mobile.svg";
import iconDice from "./assets/icon-dice.svg";

//
function App() {
  function fetchDatos() {
    const fetchData = async () => {
      const response = await axios.get("https://api.adviceslip.com/advice");
      const data = response.data.slip;
      let title = document.getElementById("title");
      title.innerHTML = "ADVICE #" + data.id;
      let mensaje = document.getElementById("mensaje");
      mensaje.innerHTML = data.advice;
    };

    fetchData();
  }
  //Definimos el estado para la variable imagen ysu estado inicial
  const [imagen, setImagen] = useState("");

  //Utilizamos el useEffect para ejecutar un codigo cuando cambie el tamaño de la pantalla
  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    if (innerWidth > 500) {
      setImagen(dividerDesktop);
    } else {
      setImagen(dividerMobile);
    }
    //Definimos una funcion llamada cambioDimensiones que maneje el cambio de dimension de la ventana
    const cambioDimensiones = () => {
      //Verificamos si el ancho de la ventana es mayor a 375px
      if (window.innerWidth > 500) {
        //Actualizamos el estado de la imagen con la ruta de la img de desktop
        setImagen(dividerDesktop);
      } else {
        //Actualizamos el estado de la imagen con la ruta de la img de mobile
        setImagen(dividerMobile);
      }
    };
    //Agregamos un detector de eventos para eventos resize en el objeto d ela ventana
    window.addEventListener("resize", cambioDimensiones);

    //Funcion de limpieza: Eliminamos el detector de eventos cuando el componenten se desmonta
    return () => window.removeEventListener("resize", cambioDimensiones);
  }, []);
  return (
    //renderizamos el contenido principal de la app
    <>
      <p className="title" id="title">
        ADVICE #117
      </p>
      <p className="advice">
        "
        <span id="mensaje">
          It is easy to sit up and take notice, what's difficult is getting up
          and taking action.
        </span>
        "
      </p>
      {/*Muestra la imagen segun la dimension de la pantalla */}
      <img src={imagen} />
      <button onClick={fetchDatos}>
        <img src={iconDice} />
      </button>
    </>
  );
}

export default App;
