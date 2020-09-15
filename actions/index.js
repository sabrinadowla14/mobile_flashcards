import { getDecks } from "../utils/api";

export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";
export const REMOVE_DECK = "REMOVE_DECK";

//handle initial data
export const handleInitialData = () => async dispatch => {
  const response = await getDecks();
  dispatch(receiveDecks(response));
};

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}

export function addCard(question, answer, deck) {
  return {
    type: ADD_CARD,
    question,
    answer,
    deck
  };
}

export function removeDeck(id) {
  return {
    type: REMOVE_DECK,
    id
  };
}
export function getAllDecks() {
  return dispatch => {
    getDecks().then(decks => {
      dispatch({
        type: RECEIVE_DECKS,
        decks
      });
    });
  };
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  };
}
