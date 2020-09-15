import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD,
  REMOVE_DECK
} from "../actions/index";

export default function questions(state = {}, action) {
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
      return {
        ...state,
        [action.deck.title]: {
          ...action.deck,
          questions: [
            ...action.deck.questions,
            {
              question: action.question,
              answer: action.answer
            }
          ]
        }
      };

    case REMOVE_DECK:
      return {
        decks: [...state.decks.filter(deckId => deckId !== action.id)]
      };

    default:
      return state;
  }
}
