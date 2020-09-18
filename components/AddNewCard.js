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
  handleCardSubmit = () => {
    // e.preventDefault();
    const { questions, answers } = this.state;
    const { deck, card } = this.props;
    this.props.addCard(questions, answers, deck);
    //addCardToDeck(deck, card);
    this.setState({
      questions: "",
      answers: ""
    });
    this.props.navigation.navigate("Decks");
  };
  render() {
    const { questions, answers } = this.state;
    return (
      <View style={styles.container}>
        <Text> AddNewCard </Text>
        <TextInput
          style={styles.input}
          placeholder="Questions Please"
          placeholderTextColor="#9a73ef"
          onChangeText={this.handleInputOptChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Answers Please"
          placeholderTextColor="#9a73ef"
          onChangeText={this.handleInputOptChange}
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
  //const { id } = props.route.params.id;
  const decksInfo = Object.values(decks || {});
  const deck = Object.keys(decksInfo).map((key, i) => {
    decksInfo[key];
  });

  return {
    //deck: decks[id],
    card: deck.card
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addCard: (questions, answers, deck) => {
      dispatch(addCard(questions, answers, deck));
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
