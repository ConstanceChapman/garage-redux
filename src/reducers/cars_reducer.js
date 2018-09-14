export default function(state = null, action) {
  switch (action.type) {
    case 'GET_CARS':
      return action.payload;
    default:
      return state;
  }
}
