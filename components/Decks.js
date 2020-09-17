import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";

class Decks extends Component {
  state = {};

  handleNewCard = () => {
    //const { deckId } = this.props.route.params.id;
    this.props.navigation.navigate("AddNewCard", {
      deckId: this.props.id,
      decks: this.props.decks
    });
  };

  handleQuiz = () => {
    //const { deckId } = this.props.routes.params.id;
    this.props.navigation.navigate("Quiz", { deckId: id });
    this.props.navigation.goBack();
  };

  handleDeleteDeck = () => {
    this.props.navigation.navigate("DeleteDeck", { deckId: id });
    this.props.navigation.goBack();
  };

  render() {
    const { id, title, navigation, totalNoOfCards, decks, deck } = this.props;
    return (
      <View>
        <Text> {title}</Text>
        <Text>Total {totalNoOfCards} Cards.</Text>
        <Button title="newCard" onPress={this.handleNewCard} />
        <Button title="quiz" onPress={this.handleQuiz} />
        <Button title="deleteDeck" onPress={this.handleDeleteDeck} />
      </View>
    );
  }
}

const mapStateToProps = (state, { props }) => {
  // const { deckId } = props.route.params.id
  const { decks } = state;

  //const deck = decks[deckId];
  const decksInfo = Object.values(decks || {});
  const deck = Object.keys(decksInfo).map((key, i) => {
    decksInfo[key];
  });

  return {
    decksInfo: decksInfo !== undefined ? decksInfo : null,
    decks
  };
};

export default connect(mapStateToProps)(Decks);
