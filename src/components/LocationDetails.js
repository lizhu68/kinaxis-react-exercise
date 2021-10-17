import React, { useEffect, useState, useContext } from "react";
import ReservesContext from "../store/reserves-content";
import {
  getLocation,
  saveLocation,
  getAvailableLotsById,
} from "../services/fakeLocationService";
import "./LocationDetails.css";
import _ from "lodash";

export default function LocationDetails(props) {
  const [location, setLocation] = useState({});
  const [lots, setLots] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const reservesCtx = useContext(ReservesContext);

  useEffect(() => {
    setLocation(getLocation(props.match.params.id));
  }, [props.match.params.id]);

  useEffect(() => {
    setLots(location.lots);
  }, [location]);

  useEffect(() => {
    // console.log("is difference check : " + _.isEqual(lots, location.lots));
    setButtonDisabled(_.isEqual(lots, location.lots));
  }, [lots, location]);

  const handleSave = () => {
    const tempLocation = { ...location };
    const tempLots = [...location.lots];
    // tempLocation.preLots = temp;
    tempLocation.lots = lots;
    saveLocation(tempLocation);
    if (!reservesCtx.itemIsReserved(location.id)) {
      tempLocation.preLots = tempLots;
    }
    reservesCtx.reserve(tempLocation);

    // Navigate to home page
    // props.history.replace("/");
    props.history.goBack();
  };

  const handleReset = () => {
    setLots([...location.lots]);
  };

  const handleLotClick = (e) => {
    const temp = lots.map((l, index) =>
      index === parseInt(e.target.value) ? 0 : l
    );
    setLots(temp);
  };

  //the 1 in lots array means available
  //0 means occupied
  return (
    <div className="container">
      {Object.keys(location).length === 0 || lots?.length === 0 ? (
        <p>Location not found</p>
      ) : (
        <div className="row">
          <div className="col mt-3">
            <h2>Location Details - {location.name} </h2>
            <address>{location.address}</address>
            <p>
              The hourly rate is ${location.rate}. Please select the lots you
              would like to reserve and press the Save button. Click the Reset
              button to re-select.
            </p>
            <div>
              {lots &&
                lots.length &&
                lots.map((lot, index) => {
                  return (
                    <button
                      key={index}
                      className={
                        lot ? "background-green" : "background-red disabled"
                      }
                      onClick={handleLotClick}
                      value={index}
                    >
                      {index + 1}
                    </button>
                  );
                })}
            </div>
            {getAvailableLotsById(location.id) > 0 ? (
              <div
                className="reserveButtons btn-group float-right"
                role="group"
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={props.history.goBack}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleReset}
                  disabled={buttonDisabled}
                >
                  Reset
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={buttonDisabled}
                >
                  Save
                </button>
              </div>
            ) : (
              <p>All occupied</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
