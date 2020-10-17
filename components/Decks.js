import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { connect } from "react-redux";
import { white, gray, black, green, red, blue, purple } from "../utils/colors";
import { removeDeck } from "../actions/index";
import { removeDeckAsync } from "../utils/api";

class Decks extends Component {
  state = {};

  handleNewCard = () => {
    const { itemId } = this.props.route.params;

    this.props.navigation.navigate("AddNewCard", {
      title: itemId
    });
  };

  handleQuiz = () => {
    const { itemId, cardCount } = this.props.route.params;

    this.props.navigation.navigate("Quiz", {
      itemId,
      cardCount: this.props.decks[itemId]
        ? this.props.decks[itemId].questions.length
        : null
    });
  };

  handleDeleteDeck = () => {
    const { removeDeck, navigation, decks } = this.props;
    const { itemId } = this.props.route.params.itemId;

    removeDeck(this.props.route.params.itemId);
    removeDeckAsync(this.props.route.params.itemId);
  };

  render() {
    const { navigation, decks, deckInfo } = this.props;
    const { itemId, cardCount } = this.props.route.params;

    const cardLen = decks[itemId] && decks[itemId].questions.length;

    return (
      <View style={styles.container}>
        <Text style={styles.title}> {itemId}</Text>
        <Text style={styles.title}>{cardLen} cards.</Text>

        <Button
          buttonStyle={styles.addCardBtn}
          title="New Card"
          onPress={this.handleNewCard}
          color="#9C27B0"
        />
        <Button title="Quiz" onPress={this.handleQuiz} color="green" />
        <Button
          title="Delete Deck"
          onPress={this.handleDeleteDeck}
          color="maroon"
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const decks = state;
  const deckInfo = decks
    ? Object.values(decks).map(deck => ({
        itemId: deck.title
      }))
    : null;

  return {
    decks,
    deckInfo
  };
};

export default connect(mapStateToProps, { removeDeck })(Decks);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 35,
    backgroundColor: white,
    marginTop: 150
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
    marginTop: 15,
    borderRadius: 16,
    backgroundColor: purple,
    color: white,
    fontSize: 17,
    textAlign: "center",
    padding: 10,
    margin: 5,
    height: 50,
    width: 95
  },
  addCardBtn: {
    marginTop: 50,
    borderRadius: 15,
    backgroundColor: "#9C27B0",
    color: white,
    fontSize: 15,
    textAlign: "center",
    padding: 5,
    margin: 5,
    height: 50,
    width: 95
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: black,
    marginLeft: 135,
    marginBottom: 20
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

  card: {
    fontSize: 25
  },

  start: {
    backgroundColor: green
  },
  delete: {
    backgroundColor: red
  }
});
