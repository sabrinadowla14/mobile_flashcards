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
import { addDeck } from "../actions";
import { saveDeckTitleAsync } from "../utils/api";

import { white, gray, black, green, red, blue, maroon } from "../utils/colors";
import color from "../utils/colors";

class AddNewDeck extends Component {
  state = {
    title: ""
  };
  handleInputTitleChange = title => {
    this.setState({
      title
    });
  };
  handleDeckTitleSubmit = () => {
    const { title } = this.state;
    const { decks, deckTitle } = this.props;
    const lenTitle = title.length;

    if (lenTitle > 0) {
      if (deckTitle === undefined) {
        this.props.addDeck(title);
        saveDeckTitleAsync(title);

        Alert.alert(`New Deck is: ${title}`);

        this.props.navigation.navigate("Decks", {
          itemId: this.state.title
        });
        this.setState({
          title: ""
        });
      } else {
        Alert.alert("We have this deck");
      }
    } else {
      Alert.alert("We don't have this deck");
    }
  };

  render() {
    const { title } = this.state;
    const { decks } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}> What is the title of your new Deck? </Text>

        <TextInput
          style={styles.input}
          placeholder="Please Enter the Name of Deck"
          value={this.state.title}
          placeholderTextColor="#9a73ef"
          onChangeText={this.handleInputTitleChange}
        />

        <Button
          disabled={title === ""}
          title="ADD DECK"
          onPress={this.handleDeckTitleSubmit}
          color="blue"
        />
      </View>
    );
  }
}

const mapStateToProps = (state, { route }) => {
  const { decks } = state;
  const { title } = route.params.title;
  const deckTitle = decks
    ? Object.values(decks).find(deck => deck === this.state.title)
    : null;

  return {
    decks,
    deckTitle
  };
};

export default connect(null, { addDeck })(AddNewDeck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    margin: 15,
    height: 40,
    width: 220,
    borderColor: "#7a42f4",
    borderWidth: 1,
    paddingLeft: 7
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: "white"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: maroon,
    marginBottom: 50
  },
  card: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: "bold",
    color: maroon
  },
  btn: {
    borderRadius: 10,
    backgroundColor: gray,
    color: black,
    fontSize: 15,
    textAlign: "center",
    padding: 5,
    margin: 5,
    height: 35,
    width: 130
  }
});
