import React, { useState, useEffect } from "react";
import ListGroup from "./common/listGroup";
import { getAreas } from "../services/fakeAreaService";
import { getLocations } from "../services/fakeLocationService";
import LocationList from "./LocationList";

export default function Locations() {
  const all = { id: "", name: "All Areas" };
  const areas = [all, ...getAreas()];
  const [locations, setLocations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedArea, setSelectedArea] = useState(all);

  useEffect(() => {
    setLocations(getLocations());
  }, []);

  useEffect(() => {
    const filteredLocations =
      selectedArea && selectedArea.id
        ? locations.filter((l) => l.area.id === selectedArea.id)
        : locations;
    setFiltered(filteredLocations);
  }, [locations, selectedArea]);

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
  };

  return (
    <div>
      {filtered.length === 0 ? (
        <p>There are no locations in the database</p>
      ) : (
        <div className="row">
          <div className="col-3 mt-3">
            <ListGroup
              items={areas}
              selectedItem={selectedArea}
              onItemSelect={handleAreaSelect}
            />
          </div>
          <div className="col mt-3">
            <p>Showing {filtered.length} locations in the database.</p>
            <LocationList locations={filtered} />
          </div>
        </div>
      )}
    </div>
  );
}
