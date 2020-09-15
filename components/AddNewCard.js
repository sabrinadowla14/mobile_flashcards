import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import { addCard } from "../actions";
import { addCardToDeck } from "../utils/api";

class AddNewCard extends Component {
  state = {
    questions: "",
    answers: ""
  };
  handleInputOptChange = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };
  handleCardSubmit = e => {
    e.preventDefault();
    const { questions, answers } = this.state;
    const { deck, card } = this.props;
    this.props.addCard(questions, answers, deck);
    addCardToDeck(deck, card);
    this.setState({
      questions: "",
      answers: ""
    });
    this.props.navigation.navigate("DecksDetails");
    this.props.navigation.goBack();
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
  const { id } = props.match.params;
  const { decks } = state.decks;
  return {
    deck: decks ? decks[id] : null,
    card: deck.card,

    id
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
