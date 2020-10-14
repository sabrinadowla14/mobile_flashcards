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
    this.props.navigation.navigate("AddNewCard", {
      itemId: this.props
      // decks: this.props.decks
    });
  };

  handleQuiz = () => {
    //const { deckId } = this.props.routes.params.id;

    const { itemId, numberOfCards } = this.props.route.params;

    this.props.navigation.navigate("Quiz", {
      itemId: JSON.parse(JSON.stringify(itemId)),
      numberOfCards:
        this.props.decks[itemId] !== undefined
          ? this.props.decks[itemId].questions.length
          : null
    });
  };

  handleDeleteDeck = () => {
    const { removeDeck, navigation, decks } = this.props;
    const { itemId } = this.props.route.params;
    const deck = decks[itemId];
    const id = deck.title;
    removeDeck(id);
    removeDeckAsync(id);
    navigation.goBack();
  };

  render() {
    const { title, navigation, totalNoOfCards, decks, deck } = this.props;
    return (
      <View>
        <Text> {title}</Text>
        <Text>Total {totalNoOfCards} Cards.</Text>
        <Button title="New Card" onPress={this.handleNewCard} />
        <Button title="Quiz" onPress={this.handleQuiz} />
        <Button title="Delete Deck" onPress={this.handleDeleteDeck} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const decks = state;
  return {
    decks
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
