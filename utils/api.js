import { startingDecks } from "./_DATA";
import AsyncStorage from "@react-native-community/async-storage";
import { generateID } from "./helpers";

const DECKS_KEY = "Flashcards:decks";

export async function removeAllDecks() {
  await AsyncStorage.clear();
}

// get all decks
export const getDecksAsync = async () => {
  try {
    const decksData = await AsyncStorage.getItem(DECKS_KEY);
    console.log("decksData", decksData);
    return decksData !== null
      ? JSON.parse(decksData)
      : AsyncStorage.setItem(DECKS_KEY, JSON.stringify(startingDecks));
  } catch (err) {
    console.log(err);
  }
};

/*export async function getDecksAsync() {
  try {
    const decksStorage = await AsyncStorage.getItem(DECKS_KEY);
    if (decksStorage === null) {
      AsyncStorage.setItem(DECKS_KEY, JSON.stringify(startingDecks));
    }
    return decksStorage === null ? decks : JSON.parse(decksStorage);
  } catch (e) {
    console.log(e);
  }
}*/

// get one deck
export const getDeckAsync = async id => {
  try {
    const deckData = await AsyncStorage.getItem(DECKS_KEY);
    return deckData !== null ? JSON.parse(deckData)[id] : null;
  } catch (e) {
    console.log(e);
  }
};

// save deck title
export const saveDeckTitleAsync = async title => {
  try {
    await AsyncStorage.mergeItem(
      DECKS_KEY,
      JSON.stringify({
        [title]: {
          title,
          questions: []
        }
      })
    );
  } catch (e) {
    console.log(e);
  }
};

// add card to deck
export const addCardToDeck = async (title, card) => {
  try {
    const deck = await getDeckAsync(title);

    await AsyncStorage.mergeItem(
      DECKS_KEY,
      JSON.stringify({
        [title]: {
          questions: [...deck.questions].concat(card)
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
};

/*export async function addCardToDeck(title, card) {
  try {
    //const deck = await getDeck(deckId);

    await AsyncStorage.getItem(DECKS_KEY).then(results => {
      const data = JSON.parse(results);
      Object.keys(data).map(id => {
        if (id === title) {
          data[id].questions.push(card);
        }
      });
      AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data));
    });
  } catch (err) {
    console.log(err);
  }
}
*/
// delete a deck
export const removeDeckAsync = async id => {
  try {
    const decksData = await AsyncStorage.getItem(DECKS_KEY);
    const decks = JSON.parse(decksData);

    decks[id] = undefined;
    delete decks[id];
    await AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks));
  } catch (e) {
    console.log(e);
  }
};

export const resetDecksAsync = async () => {
  try {
    await AsyncStorage.setItem(DECKS_KEY, JSON.stringify(startingDecks));
  } catch (e) {}
};
