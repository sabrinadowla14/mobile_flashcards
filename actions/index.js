import {
  getDecksAsync,
  saveDeckTitle,
  getDeckAsync,
  addCardToDeck,
  removeDeckAsync
} from "../utils/api";

export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";
export const REMOVE_DECK = "REMOVE_DECK";

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}

//handle initial data
export const handleInitialData = () => async dispatch => {
  const response = await getDecksAsync();
  dispatch(receiveDecks(response));
};

export const addDeck = title => ({
  type: ADD_DECK,
  title
});

/*export const addCardToDeck = (deckId, card) => ({
  type: ADD_CARD,
  deckId,
  card
}); */

/*export function addCard(question, answer, deck) {
  return {
    type: ADD_CARD,
    question,
    answer,
    deck
  };
}*/

/*export function addCard(title) {
  return {
    [title]: {
      title: title,
      questions: []
    }
  };
}*/

export function addCard(deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card
  };
}

export function removeDeck(deckId) {
  return {
    type: REMOVE_DECK,
    deckId
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

/*export function handleAddDeck(key, deck) {
  return dispatch => {
    return saveDeckTitle(key, deck).then(res => {
      dispatch(addDeck(res));
    });
  };
} */

export function handleAddDeck(deck) {
  return dispatch => {
    return saveDeckTitleAsync(deck).then(res => {
      dispatch(addDeck(res));
    });
  };
}

export function deckObject(dTitle) {
  return {
    [dTitle]: {
      title: dTitle,
      questions: []
    }
  };
}

export function cardObject(question, answer) {
  return { question, answer };
}
