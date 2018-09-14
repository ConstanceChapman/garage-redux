// TODO: add and export your own actions
export function fetchCars(garage) {
  const promise = fetch(`https://wagon-garage-api.herokuapp.com/${garage}/cars`)
    .then(response => response.json());
  return {
    type: 'GET_CARS',
    payload: promise
  };
};

export function createCar(body, garage, callback) {
  const request = fetch(`https://wagon-garage-api.herokuapp.com/${garage}/cars`, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(response => response.json()).then(callback);
  return {
    type: 'CREATE_CAR',
    payload: request
  };
}
