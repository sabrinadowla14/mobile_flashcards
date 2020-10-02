import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Button
} from "react-native";
import { connect } from "react-redux";
import { addCard } from "../actions";
import { addCardToDeck } from "../utils/api";
import { cardObject } from "../utils/api";
import color from "../utils/colors";

class AddNewCard extends Component {
  state = {
    question: "",
    answer: ""
  };
  handleInputQustionChange = questions => {
    this.setState({
      questions
    });
  };
  handleInputAnswerChange = answers => {
    this.setState({
      answers
    });
  };
  handleCardSubmit = async () => {
    // e.preventDefault();
    const { deckId } = this.props.route.params.deckId;
    const { questions, answers } = this.state;
    const { card, addCard } = this.props;
    await addCardToDeck(card, deckId);
    addCard(card, deckId);
    goBack();

    //addCardToDeck(deck, card);
    this.setState({
      questions: "",
      answers: ""
    });
    this.props.navigation.navigate("Decks");
  };
  render() {
    const { questions, answers } = this.state;
    const { deckId } = this.props.route.params.deckId;
    return (
      <View style={styles.container}>
        <Text> Add a New Card to {deckId} </Text>
        <TextInput
          style={styles.input}
          placeholder="Questions Please"
          placeholderTextColor="#5DADE2"
          onChangeText={this.handleInputQustionChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Answers Please"
          placeholderTextColor="#9a73ef"
          onChangeText={this.handleInputAnswerChange}
        />
        <Button
          disabled={questions === "" || answers === ""}
          title="ADD CARD"
          onPress={this.handleCardSubmit}
        />
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  const { decks } = state;
  //const { deckId } = props.route.params.deckId;
  //const decksInfo = Object.values(decks || {});
  //const deck = Object.keys(decksInfo).map((key, i) => {
  //  decksInfo[key];
  //});

  return {
    decks
    //deckId
  };
}

function mapDispatchToProps(dispatch) {
  const { question, answer } = this.state;
  const card = cardObject(question, answer);
  return {
    addCard: (card, deckId) => {
      dispatch(addCard(card, deckId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCard);

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: "white"
  }
});
