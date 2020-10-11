import { decks } from "./_DATA";
import AsyncStorage from "@react-native-community/async-storage";
import { generateID } from "./helpers";

const DECKS_KEY = "Flashcards:decks";

export async function removeAllDecks() {
  await AsyncStorage.clear();
}

// get all decks
/*export const getDecksAsync = async () => {
  try {
    const decksStorage = await AsyncStorage.getItem(DECKS_KEY);

    return decksStorage !== null
      ? JSON.parse(decksStorage)
      : AsyncStorage.setItem(DECKS_KEY, JSON.stringify(startingDecks));
  } catch (e) {
    Alert.alert("Error while fetching decks data");
    console.log(e);
  }
}; */

export async function getDecksAsync() {
  try {
    const decksStorage = await AsyncStorage.getItem(DECKS_KEY);
    if (decksStorage === null) {
      AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks));
    }
    return decksStorage === null ? decks : JSON.parse(decksStorage);
  } catch (e) {
    console.log(e);
  }
}

// get one deck
export const getDeckAsync = async id => {
  try {
    const deckData = await AsyncStorage.getItem(DECKS_KEY);
    return deckData !== null ? JSON.parse(deckData)[id] : null;
  } catch (e) {
    Alert.alert("Did not find the single deck!");
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
    Alert.alert("Not able to save a deck");
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
    Alert.alert("Not able to save the card");
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

    await AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks)).then(() =>
      Alert.alert("Deck deleted")
    );
  } catch (e) {
    Alert.alert("Not able to delete the deck ");
  }
};

export const resetDecksAsync = async () => {
  try {
    await AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks));
  } catch (e) {
    Alert.alert("Not able to reset data");
  }
};
