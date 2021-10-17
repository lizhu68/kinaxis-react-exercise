import React, { useState, useEffect, useContext } from "react";
import { getLocations } from "../services/fakeLocationService";
import LocationList from "./LocationList";
import ReservesContext from "../store/reserves-content";
import _ from "lodash";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const reservesCtx = useContext(ReservesContext);

  useEffect(() => {
    setLocations(getLocations());
  }, []);
  return (
    <div className="row container">
      <div className="mt-3">
        <h2>Top 3 locations</h2>
        {locations.length === 0 ? (
          <p>There are no locations in the database</p>
        ) : (
          <LocationList locations={_.take(_.orderBy(locations, ["rate"]), 3)} />
        )}

        <h2>My Reserves</h2>
        {reservesCtx.totalReserves === 0 ? (
          <p> You get no reserves yet. Start adding some?</p>
        ) : (
          <LocationList locations={reservesCtx.reserves} />
        )}
      </div>
    </div>
  );
}
