import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { white, gray, black, green, red, blue, maroon } from "../utils/colors";

class DecksView extends Component {
  handleDeck = e => {
    this.props.navigation.navigate(
      "Decks",
      { itemId: this.props.deckId },
      { cardCount: this.props.deck.questions.length }
    );
  };

  render() {
    const { deckId, cardCount, title, deck } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleDeck()}
        >
          <Text style={styles.title}>{deckId}</Text>

          <Text style={styles.card}>Total {deck.questions.length} cards.</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 35,
    backgroundColor: white
  },
  input: {
    paddingLeft: 10,
    marginTop: 15,
    height: 45,
    borderRadius: 5,
    borderColor: gray,
    borderWidth: 1
  },
  button: {
    borderRadius: 25,
    backgroundColor: gray,
    color: black,
    fontSize: 15,
    textAlign: "center",
    height: 25,
    width: 110
  },
  btn: {
    borderRadius: 10,
    backgroundColor: gray,
    color: black,
    fontSize: 20,
    textAlign: "center",
    padding: 5,
    margin: 5,
    height: 35,
    width: 130
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: black,
    textAlign: "center",
    padding: 5,
    marginBottom: 5
  },
  card: {
    marginTop: 5,
    fontSize: 15,
    color: maroon
  },
  titleList: {
    fontSize: 20,
    fontWeight: "bold",
    color: black
  },
  noDataText: {
    textAlign: "center",
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  btn: {
    backgroundColor: blue,
    color: white,
    fontSize: 17,
    textAlign: "center",
    padding: 10,
    margin: 5,
    borderRadius: 2,
    height: 45,
    width: 100
  },
  start: {
    backgroundColor: green
  },
  delete: {
    backgroundColor: red
  }
});

export default DecksView;
