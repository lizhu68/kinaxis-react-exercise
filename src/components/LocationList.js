import React from "react";
import LocationItem from "./LocationItem";

export default function LocationList(props) {
  //   console.log(props.locations);
  return (
    <div>
      {props.locations.map((item) => (
        <LocationItem
          key={item.id}
          id={item.id}
          name={item.name}
          address={item.address}
          area={item.area}
          lots={item.lots}
          rate={item.rate}
        />
      ))}
    </div>
  );
}
