import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

class DecksDetails extends Component {
  state = {};
  handleNewCard = () => {
    this.props.navigation.navigate("AddNewCard", { deck: this.props.deck });
  };

  handleQuiz = () => {
    this.props.navigation.navigate("Quiz", { deck: this.props.deck });
  };

  render() {
    const { deck_title, navigation, totalNoOfCards, deck } = this.props;
    return (
      <View>
        <Text> {deck_title}</Text>
        <Text>Total {totalNoOfCards} Cards.</Text>
        <Button title="newCard" onPress={this.handleNewCard} />
        <Button title="quiz" onPress={this.handleQuiz} />
      </View>
    );
  }
}

export default connect()(DecksDetails);
