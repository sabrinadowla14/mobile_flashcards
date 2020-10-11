import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { connect } from "react-redux";
import { white } from "../utils/colors";

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

    this.props.navigation.navigate("Quiz", {
      itemId: this.props
    });
  };

  handleDeleteDeck = () => {
    this.props.navigation.navigate("DeleteDeck", {
      itemId: this.props
    });
  };

  render() {
    const { itemId } = this.props;
    // const cardId = JSON.parse(JSON.stringify(itemId).itemId);

    const { title, navigation, totalNoOfCards, decks, deck } = this.props;
    return (
      <View>
        <Text> {itemId}</Text>

        <Button title="New Card" onPress={this.handleNewCard} />
        <Button title="Quiz" onPress={this.handleQuiz} />
        <Button title="Delete Deck" onPress={this.handleDeleteDeck} />
      </View>
    );
  }
}

const mapStateToProps = (state, { route }) => {
  const { itemId } = route.params;
  const { decks } = state;

  //const deck = decks[deckId];
  const decksInfo = Object.values(decks || {});
  const deck = Object.keys(decksInfo).map((key, i) => {
    decksInfo[key];
  });

  return {
    decksInfo: decksInfo !== undefined ? decksInfo : null,
    decks,
    itemId
  };
};

export default connect()(Decks);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 35,
    backgroundColor: white
  }
});
