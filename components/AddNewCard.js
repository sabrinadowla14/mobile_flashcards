import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
  Alert
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
  handleCardSubmit = () => {
    // e.preventDefault();
    const { title } = this.props.route.params;
    //const { checkCard } = this.props;
    const { question, answer } = this.state;
    const { card } = cardFormat(question, answer);
    const { addCard } = this.props;
    //const { goBack } = this.props.navigation;

    addCard(title, card);
    addCardToDeck(title, card);

    this.props.navigation.navigate("Decks", { itemId: title });

    //addCardToDeck(deck, card);
    this.setState({
      question: "",
      answer: ""
    });
    //this.props.navigation.navigate("Decks");
  };
  render() {
    const { question, answer } = this.state;
    const { title } = this.props.route.params;
    return (
      <View style={styles.container}>
        <Text> Add a New Card to {title} </Text>
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
          disabled={question === "" || answer === ""}
          title="ADD CARD"
          onPress={this.handleCardSubmit}
        />
      </View>
    );
  }
}

function mapStateToProps(state, { route }) {
  const { decks } = state;
  const { title } = route.params;
  //const checkCard = decks
  //  ? Object.values(decks).map(deck => ({ card: deck.questions

  // }))
  //  : null;

  return {
    decks,
    title
    // checkCard
  };
}

function mapDispatchToProps(dispatch) {
  const { question, answer } = this.state;
  const card = cardFormat(question, answer);
  return {
    addCard: (title, card) => {
      dispatch(addCard(title, card));
    }
  };
}

export default connect(mapStateToProps, { addCard })(AddNewCard);

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
