import { createContext, useState } from "react";

const ReservesContext = createContext({
  reserves: [],
  totalReserves: 0,
  reserve: (location) => {},
  removeReservation: (locationId) => {},
  itemIsReserved: (locationId) => {},
});

export function ReservesContextProvider(props) {
  const [userReserves, setUserReserves] = useState([]);

  function reserveHandler(location) {
    if (itemReservesHandler(location.id)) {
      let locationInContext =
        userReserves.find((r) => r.id === location.id) || {};
      locationInContext.lots = location.lots;

      setUserReserves((prevUserReserve) => {
        return prevUserReserve.map((pr) =>
          pr.id === location.id ? { ...locationInContext } : pr
        );
      });
    } else {
      setUserReserves((prevUserReserve) => {
        return prevUserReserve.concat(location);
      });
    }
  }
  function removeReservationHandler(locationId) {
    setUserReserves((prevUserReserve) => {
      return prevUserReserve.filter((location) => location.id !== locationId);
    });
  }
  function itemReservesHandler(locationId) {
    return userReserves.some((location) => location.id === locationId);
  }
  function getItemReservedPreLotsHandler(locationId) {
    let reserve = userReserves.find((m) => m.id === locationId) || {};
    return reserve?.preLots ? reserve.preLots : reserve.lots;
  }
  const context = {
    reserves: userReserves,
    totalReserves: userReserves.length,
    reserve: reserveHandler,
    removeReservation: removeReservationHandler,
    itemIsReserved: itemReservesHandler,
    getItemPreLots: getItemReservedPreLotsHandler,
  };
  return (
    <ReservesContext.Provider value={context}>
      {props.children}
    </ReservesContext.Provider>
  );
}

export default ReservesContext;
