import React, { useContext } from "react";
import ReservesContext from "../store/reserves-content";
import LocationList from "./LocationList";

export default function Reserves() {
  const reservesCtx = useContext(ReservesContext);
  let content;

  if (reservesCtx.totalReserves === 0) {
    content = <p> You get no reserves yet. Start adding some?</p>;
  } else {
    content = <LocationList locations={reservesCtx.reserves} />;
  }

  return (
    <div className="row container">
      <div className="col mt-3 ml-3">
        <h1>My Reservations</h1>
        {content}
      </div>
    </div>
  );
}
