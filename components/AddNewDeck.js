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
//import DecksDetails from "./DecksDetails";
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
    const { decks, deckTitle } = this.props;
    const lenTitle = title.length;
    // title exist
    if (lenTitle > 0) {
      if (deckTitle === undefined) {
        this.props.addDeck(title);
        saveDeckTitleAsync(title);

        Alert.alert(`${title} created!`);
        //this.props.navigation.navigate("Decks", { itemId: this.state.title });
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

const mapStateToProps = (state, { route }) => {
  // const { deckId } = props.route.params.id
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

/*function mapDispatchToProps(dispatch) {
  return {
    handleAddDeck: title => {
      dispatch(handleAddDeck(title));
    }
  };
}*/

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
