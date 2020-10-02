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
      itemId: this.props.route.params.itemId
    });
  };

  handleQuiz = () => {
    //const { deckId } = this.props.routes.params.id;

    this.props.navigation.navigate("Quiz", {
      itemId: this.props.route.params.itemId
    });
  };

  handleDeleteDeck = () => {
    this.props.navigation.navigate("DeleteDeck", {
      itemId: this.props.route.params.itemId
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 35,
    backgroundColor: white
  }
});
