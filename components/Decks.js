import React, { Component } from "react";
import {
  Button,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { white } from "../utils/colors";

class Decks extends Component {
  state = {};

  handleNewCard = () => {
    this.props.navigation.navigate("AddNewCard", {
      itemId: this.props.route.params.deckId
    });
  };

  handleQuiz = () => {
    //const { deckId } = this.props.routes.params.id;

    this.props.navigation.navigate("Quiz", {
      itemId: this.props.route.params.deckId
    });
  };

  handleDeleteDeck = () => {
    this.props.navigation.navigate("DeleteDeck", {
      itemId: this.props.route.params.deckId
    });
  };

  render() {
    const { title, navigation, totalNoOfCards, decks, deckId } = this.props;

    return (
      <View>
        <Text> {deckId}</Text>
        <Text>Total {totalNoOfCards} Cards.</Text>
        <Button title="New Card" onPress={this.handleNewCard} />
        <Button title="Quiz" onPress={this.handleQuiz} />
        <Button title="Delete Deck" onPress={this.handleDeleteDeck} />
      </View>
    );
  }
}

const mapStateToProps = (state, { props }) => {
  const { deckId } = props.route.params.deckId;
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
