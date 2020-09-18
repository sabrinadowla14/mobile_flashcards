import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";

class Decks extends Component {
  state = {};

  handleNewCard = () => {
    this.props.navigation.navigate("AddNewCard", {
      deckId: this.props.deck.id
      // decks: this.props.decks
    });
  };

  handleQuiz = () => {
    //const { deckId } = this.props.routes.params.id;

    this.props.navigation.navigate("Quiz", {
      /*deckId: this.props.deckId */
    });
  };

  handleDeleteDeck = () => {
    this.props.navigation.navigate("DeleteDeck", {
      // deckId: this.props.deckId
    });
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

/*const mapStateToProps = (state, { route }) => {
  const { deckId } = route.params.id;
  const { decks } = state;

  //const deck = decks[deckId];
  const decksInfo = Object.values(decks || {});
  const deck = Object.keys(decksInfo).map((key, i) => {
    decksInfo[key];
  });

  return {
    decksInfo: decksInfo !== undefined ? decksInfo : null,
    decks,
    deckId
  };
}; */

export default connect()(Decks);
