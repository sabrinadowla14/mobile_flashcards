import { startingData } from "./_DATA";

const DECK_KEY = "Flashcards:decks";

// return all of the decks along with their titles, questions, and answers.
export const getDecks = async () => {
  try {
    const getDecksData = await AsyncStorage.getItem(DECKS_KEY);

    return getDecksData !== null
      ? JSON.parse(getDecksData)
      : AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks));
  } catch (e) {
    Alert.alert(e, "Did not find any decks");
    console.log(e);
  }
};

// take in a single id argument and return the deck associated with that id.
export const getDeck = async titleId => {
  try {
    const deck = await AsyncStorage.getItem(DECK_KEY);
    return deck !== null ? JSON.parse(deck)[titleId] : null;
  } catch (e) {
    Alert.alert(e, "Not able to get the deck data");
  }
};

// take in a single title argument and add it to the decks.

export const saveDeckTitle = async title => {
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
};

// take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
export const addCardToDeck = async (title, card) => {
  try {
    const deck = await getDeckAsyncStorage(title);

    await AsyncStorage.mergeItem(
      DECK_KEY,
      JSON.stringify({
        [title]: {
          questions: [...deck.questions].concat(card)
        }
      })
    );
  } catch (e) {
    Alert.alert(e, "Cannot save the card");
  }
};

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
export const removeDeck = async key => {
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
