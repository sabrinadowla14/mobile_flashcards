import React, { Component, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { handleAddDeck } from "../actions";
import { saveDeckTitle } from "../utils/api";
import DecksDetails from "./DecksDetails";
import { white, blue, red } from "../utils/colors";
import color from "../utils/colors";

class AddNewDeck extends Component {
  state = {
    title: ""
  };
  handleInputTitleChange = title => {
    //e.preventDefault();

    this.setState({
      title
    });
  };
  handleDeckTitleSubmit = () => {
    // e.preventDefault();
    const { title } = this.state;
    const { decks } = this.props;

    if (!title) {
      Alert.alert("Please enter deck title");
    } /*else if (decks[title]) {
      Alert.alert("This deck exists - please choose another deck!"); }*/ else {
      this.props.handleAddDeck(title);
      saveDeckTitle(title);
      Alert.alert(`${title} created!`);
      //this.props.navigation.navigate("Decks", { deckId: this.state.title });
      this.props.navigation.navigate("DecksDetails", {
        deckId: this.state.title
      });
      this.setState({
        title: ""
      });

      /* this.props.navigation.navigate("DecksView", {
        title: title
      });*/
    }
  };

  render() {
    const { title } = this.state;
    const { decks } = this.props;
    return (
      <View style={styles.container}>
        <Text> Add New Deck </Text>

        <TextInput
          style={styles.input}
          placeholder="Title Please"
          value={this.state.title}
          placeholderTextColor="#9a73ef"
          onChangeText={this.handleInputTitleChange}
        />

        <Button
          disabled={title === ""}
          title="ADD DECK"
          onPress={this.handleDeckTitleSubmit}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  // const { deckId } = props.route.params.id
  const { decks } = state;

  return {
    decks
  };
};

function mapDispatchToProps(dispatch) {
  return {
    handleAddDeck: title => {
      dispatch(handleAddDeck(title));
    }
  };
}

export default connect(null, mapDispatchToProps)(AddNewDeck);

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
