import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { connect } from "react-redux";
import { white } from "../utils/colors";
import { removeDeck } from "../actions/index";
import { removeDeckAsync } from "../utils/api";
//import { decksView } from "./DecksView";

class Decks extends Component {
  state = {};

  handleNewCard = () => {
    const { itemId } = this.props.route.params.itemId;
    //const { deckInfo } = this.props;
    // const itemId = deckInfo ? deckInfo.map(deck => deck.itemId) : null;
    this.props.navigation.navigate("AddNewCard", {
      title: itemId
      // decks: this.props.decks
    });
  };

  handleQuiz = () => {
    //const { deckId } = this.props.routes.params.id;

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
    //const deck = decks[itemId];
    //const id = deck.title;
    removeDeck(this.props.route.params.itemId);
    removeDeckAsync(this.props.route.params.itemId);
    //navigation.goBack();
  };

  render() {
    const { navigation, decks, deckInfo } = this.props;
    const { itemId, cardCount } = this.props.route.params;
    //const { itemId } = this.props.route.params;
    //const { itemId } = this.props.route.params.itemId;

    // const cardCount = decks[itemId] && decks[itemId].questions.length;

    //const cardCount = decks[itemId] ? decks[itemId].questions.length : null;
    // <Text>{deckInfo ? deckInfo.map(deck => deck.itemId) : null}</Text>
    return (
      <View style={styles.container}>
        <Text> {itemId}</Text>
        <Text>{cardCount} cards.</Text>

        <Button title="New Card" onPress={this.handleNewCard} />
        <Button title="Quiz" onPress={this.handleQuiz} />
        <Button title="Delete Deck" onPress={this.handleDeleteDeck} />
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
// uncomment the mapStateToProps later
export default connect(mapStateToProps, { removeDeck })(Decks);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 35,
    backgroundColor: white
  }
});
