const locations = [
  {
    id: "5b21ca3eeb7f6fbccd471815",
    name: "City of Ottawa Parking Lot",
    area: { id: "5b21ca3eeb7f6fbccd471818", name: "Ottawa" },
    address: "301 Preston St, Ottawa, ON K1R 7R6",
    lots: [1, 0, 1, 1, 0, 0, 1, 1, 1],
    rate: 2,
  },
  {
    id: "5b21ca3eeb7f6fbccd471816",
    name: "City Hall Underground Garage",
    address: "110 Laurier Ave W, Ottawa, ON K1R 6K9",
    area: { id: "5b21ca3eeb7f6fbccd471818", name: "Ottawa" },
    lots: [
      1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1,
      1, 1, 1,
    ],
    rate: 2.5,
  },
  {
    id: "5b21ca3eeb7f6fbccd471817",
    name: "Carp Park N Ride",
    address: "Carp Rd, Kinburn, ON K0A 2H0",
    area: { id: "5b21ca3eeb7f6fbccd471820", name: "Stittsville" },
    lots: [
      1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1,
      0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1,
    ],
    rate: 0.5,
  },
  {
    id: "5b21ca3eeb7f6fbccd471819",
    name: "CARSTAR Kanata",
    address: "2235 Robertson Rd, Ottawa, ON K2H 5Z2",
    area: { id: "5b21ca3eeb7f6fbccd471814", name: "Kanata" },
    lots: [
      1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0,
      1, 1, 1,
    ],
    rate: 1.5,
  },
  {
    id: "5b21ca3eeb7f6fbccd47181a",
    name: "Bells Corners Plaza Parking Lot",
    address: "2138 Robertson Rd, Nepean, ON K2H 9S1",
    area: { id: "5b21ca3eeb7f6fbccd471814", name: "Kanata" },
    lots: [1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1],
    rate: 2.5,
  },
  {
    id: "5b21ca3eeb7f6fbccd47181b",
    name: "NCC Greenbelt P5",
    address: "NCC 23, Ottawa, ON K2M 1A9",
    area: { id: "5b21ca3eeb7f6fbccd471814", name: "Kanata" },
    lots: [1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
    rate: 0,
  },
  {
    id: "5b21ca3eeb7f6fbccd47181e",
    name: "Frank MacDonald Ball Park",
    address: "Clarence Maheral Park",
    area: { id: "5b21ca3eeb7f6fbccd471820", name: "Stittsville" },
    lots: [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1],
    rate: 2,
  },
  {
    id: "5b21ca3eeb7f6fbccd47181f",
    name: "Canadian Tire Centre - Parking",
    address: "1000 Palladium Dr, Kanata, ON K2V 1A5",
    area: { id: "5b21ca3eeb7f6fbccd471820", name: "Stittsville" },
    lots: [1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1],
    rate: 0.75,
  },
  {
    id: "5b21ca3eeb7f6fbccd471821",
    name: "University of Ottawa Parking Lot",
    address: " 55 Laurier Ave. E, Ottawa, ON K1N 6N5",
    area: { id: "5b21ca3eeb7f6fbccd471818", name: "Ottawa" },
    lots: [0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1],
    rate: 5,
  },
];

export function getLocations() {
  return locations;
}

export function getLocation(id) {
  return locations.find((m) => m.id === id);
}

export function saveLocation(location) {
  let locationInDb = locations.find((m) => m.id === location.id) || {};
  locationInDb.name = location.name;
  locationInDb.address = location.address;
  locationInDb.area = location.area;
  locationInDb.lots = location.lots;
  locationInDb.rate = location.rate;
  //   locationInDb.preLots = location.preLots;
  //   console.log(locationInDb);
  if (!locationInDb.id) {
    locationInDb.id = Date.now();
    locations.push(locationInDb);
  } else {
    // console.log(locationInDb);
    locations.map((l) => (l.id === location.id ? locationInDb : l));
  }

  return locationInDb;
}

export function updateLocationLots(id, lots) {
  let locationInDb = locations.find((m) => m.id === id) || {};
  locationInDb.lots = lots;
  if (!locationInDb.id) {
    locationInDb.id = Date.now();
    locations.push(locationInDb);
  } else {
    locations.map((l) => (l.id === id ? locationInDb : l));
  }
  return locationInDb;
}

export function deleteLocation(id) {
  let locationInDb = locations.find((m) => m.id === id);
  locations.splice(locations.indexOf(locationInDb), 1);
  return locationInDb;
}

//the 1 in lots array means available
//0 means occupied
export function getAvailableLotsById(id) {
  const location = locations.find((m) => m.id === id);
  var totalAvailable = 0;
  for (const item of location.lots) {
    if (item === 1) totalAvailable++;
  }
  return totalAvailable;
}
