import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

class DecksDetails extends Component {
  state = {};

  handleNewCard = () => {
    const { deckId } = this.props.navigation.state.params;
    this.props.navigation.navigate("AddNewCard", { deckId: deckId });
  };

  handleQuiz = () => {
    const { deckId } = this.props.navigation.state.params;
    this.props.navigation.navigate("Quiz", { deckId: deckId });
  };

  handleDeleteDeck = () => {
    this.props.navigation.navigate("DeleteDeck", { deck: this.props.deck });
    this.props.navigation.goBack();
  };

  render() {
    const { title, navigation, totalNoOfCards, deck } = this.props;
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

export default connect()(DecksDetails);
