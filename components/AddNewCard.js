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
import { cardFormat } from "../actions";
import color from "../utils/colors";

class AddNewCard extends Component {
  state = {
    question: "",
    answer: ""
  };
  handleInputQustionChange = question => {
    this.setState({
      question
    });
  };
  handleInputAnswerChange = answer => {
    this.setState({
      answer
    });
  };
  handleCardSubmit = async () => {
    // e.preventDefault();
    const { deckTitle, navigation } = this.props;
    const { question, answer } = this.state;
    const { card } = cardFormat(question, answer);
    const { addCard } = this.props;
    const { goBack } = this.props.navigation;
    await addCardToDeck(deckTitle, card);
    addCard(deckTitle, card);
    goBack();

    //addCardToDeck(deck, card);
    this.setState({
      question: "",
      answer: ""
    });
    //this.props.navigation.navigate("Decks");
  };
  render() {
    const { question, answer } = this.state;
    const { deckTitle } = this.props;
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

function mapStateToProps(state, { route }) {
  const { decks } = state;
  const { deckTitle } = route.params;

  return {
    decks,
    deckTitle
  };
}

function mapDispatchToProps(dispatch) {
  const { question, answer } = this.state;
  const card = cardFormat(question, answer);
  return {
    addCard: (deckId, card) => {
      dispatch(addCard(deckId, card));
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
