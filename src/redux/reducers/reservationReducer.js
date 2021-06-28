import {
  //GET_RESERVATIONS,
  SET_ACTION_FLAG,
  SET_STATE_FLAG,
  ADD_RESERVATION,
  UPDATE_RESERVATION,
  RESERVATION_UPDATED,
  SET_FILTER_DATE,
  //FINISHED_STATE,
} from "../constants/ActionTypes";

const initialState = {
  reservations: [],
  reservation: {},
  actionFlag: 0, // 0: Add, 1: Update reservations state
  stateFlag: 0, // 0: all reservations, 1: upcoming reservations, 2: finished/cancelled reservations (what to show on screen)
  filterDate: null,
};
const reservationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RESERVATION:
      return {
        ...state,
        reservations: [...state.reservations, action.payload],
        actionFlag: 0,
      };

    case UPDATE_RESERVATION:
      return {
        ...state,
        reservation: action.payload,
        actionFlag: 1,
      };

    case RESERVATION_UPDATED:
      let tempReservations = [];
      for (let i = 0; i < state.reservations.length; i++) {
        if (state.reservations[i].id === action.payload.id)
          tempReservations.push(action.payload);
        else tempReservations.push(state.reservations[i]);
      }
      return {
        ...state,
        reservations: tempReservations,
      };

    case SET_ACTION_FLAG:
      return {
        ...state,
        actionFlag: action.payload,
      };

    case SET_STATE_FLAG:
      return {
        ...state,
        stateFlag: action.payload,
      };

    case SET_FILTER_DATE:
      return {
        ...state,
        filterDate: action.payload,
      };

    default:
      return state;
  }
};

export default reservationReducer;
