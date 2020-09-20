import { decks } from "./_DATA";
import { AsyncStorage } from "react-native";
import { generateID } from "./helpers";

const DECK_KEY = "Flashcards:decks";

export async function removeAllDecks() {
  await AsyncStorage.clear();
}

export async function getDecks() {
  let decksData = await AsyncStorage.getItem(DECK_KEY);
  return JSON.parse(decksData);
}
export async function saveDeckTitle(deck) {
  await AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify(deck));
}
export async function addCardToDeck(card, deckId) {
  const decksData = await AsyncStorage.getItem(DECKS_KEY);
  const decks = JSON.parse(decksData);

  decks[deckId] = {
    ...decks[deckId],
    questions: [...decks[deckId].questions, card]
  };
}

/*export async function removeDeck(deckId) {
  const decksData = await AsyncStorage.getItem(DECKS_KEY);
  const decks = JSON.parse(decksData);
  decks[deckId] = undefined;
  delete decks[deckId];
  await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
  }*/

// take in a single id argument and return the deck associated with that id.

/* export const getDeck = async deckId => {
    try {
      const deck = await AsyncStorage.getItem(DECK_KEY);
      return deck !== null ? JSON.parse(deck)[deckId] : null;
    } catch (e) {
      Alert.alert(e, "Not able to get the deck data");
    }
  }; */

// take in a single title argument and add it to the decks.

/* export const saveDeckTitle = async title => {
    try {
      await AsyncStorage.mergeItem(
        DECK_KEY,
        JSON.stringify({
          [title]: {
            title,
            questions: []
          }
        })
      );
    } catch (e) {
      Alert.alert(e, "Not able to save new Deck");
    }
  }; */

// take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
/*export const addCardToDeck = async (deckId, card) => {
    try {
      const deck = await getDeckAsyncStorage(deckId);

      await AsyncStorage.mergeItem(
        DECK_KEY,
        JSON.stringify({
          [deckId]: {
            questions: [...deck.questions].concat(card)
          }
        })
      );
    } catch (e) {
      Alert.alert(e, "Cannot save the card");
    }
  }; */

/*export const saveCard = (deckId, card) => {
  return AsyncStorage.mergeItem(STORAGE_KEY).then(results => {
    const data = JSON.parse(results);

    // Add card to existing deck data.
    data[deckId] = {
      ...data[deckId],
      cards: [
        ...data[deckId].cards,
        { question: card.question, answer: card.answer }
      ]
    };
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  });
}; */

//Delete a particular Deck
/*  export const _removeDeck = async key => {
    try {
      const results = await AsyncStorage.getItem(DECK_KEY);
      const data = JSON.parse(results);
      data[key] = undefined;
      delete data[key];
      await AsyncStorage.setItem(DECK_KEY, JSON.stringify(data)).then(() =>
        Alert.alert("Deck is deleted")
      );
    } catch (e) {
      Alert.alert(e, "Not able to delete the deck ");
    }
  };
}*/

export async function removeDeck(deckId) {
  const decksData = await AsyncStorage.getItem(DECK_KEY);
  const decks = JSON.parse(decksData);
  decks[deckId] = undefined;
  delete decks[deckId];
  await AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks));
}
