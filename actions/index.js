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

/*export const addCardToDeck = (deckId, card) => ({
  type: ADD_CARD,
  deckId,
  card
}); */

export function addCard(question, answer, deck) {
  return {
    type: ADD_CARD,
    question,
    answer,
    deck
  };
}

export const removeDeck = id => ({
  type: REMOVE_DECK,
  id
});

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

export const addDeck = title => ({
  type: ADD_DECK,
  title
});
