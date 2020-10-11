import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD,
  REMOVE_DECK,
  RESET_DATA
} from "../actions/index";

import { startingDecks } from "../utils/_DATA";

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };

    case ADD_DECK:
      const { title } = action;

      return {
        ...state,
        [title]: {
          title,
          questions: []
        }
      };

    case ADD_CARD:
      const { deckId, card } = action;
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          questions: [...state[deckId].questions].concat(card)
        }
      };

    case REMOVE_DECK:
      const { [action.deckId]: value, ...restOfState } = state;
      return {
        ...restOfState
      };

    case RESET_DATA:
      return startingDecks;

    default:
      return state;
  }
}

export default decks;
