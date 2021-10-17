import React, { useContext } from "react";
import ReservesContext from "../store/reserves-content";
import { Link } from "react-router-dom";
import {
  saveLocation,
  updateLocationLots,
  getAvailableLotsById,
} from "../services/fakeLocationService";

export default function LocationItem(props) {
  //   console.log(props);
  const reservesCtx = useContext(ReservesContext);
  const itemIsReserved = reservesCtx.itemIsReserved(props.id);

  function toggleReserveHandler() {
    if (itemIsReserved) {
      //reset the lots to the preLots from context
      const itemPreLots = reservesCtx.getItemPreLots(props.id);
      updateLocationLots(props.id, itemPreLots);
      reservesCtx.removeReservation(props.id);
    } else {
      const location = {
        id: props.id,
        name: props.name,
        address: props.address,
        rate: props.rate,
        area: props.area,
      };
      //fast reserve will auto reserve the 1st available lot
      const tempLots = [...props.lots];
      tempLots[tempLots.indexOf(1)] = 0;
      location.lots = tempLots;
      saveLocation(location);

      //keep the location's original lots state in the context
      const tempLots2 = [...props.lots];
      location.preLots = tempLots2;
      reservesCtx.reserve(location);
    }
  }

  return (
    <div className="card mb-3">
      <h5 className="card-header">
        <Link to={`/locations/${props.id}`}>{props.name}</Link>
      </h5>
      <div className="card-body">
        <h6 className="card-title">{props.address}</h6>
        <p className="card-text">
          This parking is in the {props.area?.name} area with{" "}
          {getAvailableLotsById(props.id)} lots. The hourly rate is $
          {props.rate}
        </p>
      </div>
      <div className="card-footer text-center">
        {getAvailableLotsById(props.id) > 0 ? (
          <button
            className="btn btn-theme"
            type="button"
            onClick={toggleReserveHandler}
          >
            {itemIsReserved ? "Remove the reservation" : "Fast Reserve"}
          </button>
        ) : (
          <p>All occupied</p>
        )}
      </div>
    </div>
  );
}
