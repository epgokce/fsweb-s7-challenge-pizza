import React from 'react'
import "./Anasayfa.css"
import { Link } from "react-router-dom";


const Main = () => {
  return (

    <div className="anasayfa">

      <div className="text-container">
        <p className="text">KOD ACIKTIRIR,</p>
        <p className="text">PIZZA DOYURUR!</p>
      </div>

      <br />

      <div className="button-container">

        <Link to="/pizza">
          <button id="pizza-siparis" type="button" data-test-id="main-page-link"> ACIKTIM </button>
        </Link>

      </div>

    </div>

  )
}

export default Main