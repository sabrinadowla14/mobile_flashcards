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
import { addDeck } from "../actions";
import { saveDeckTitle } from "../utils/api";

class AddNewDeck extends Component {
  state = {
    title: ""
  };
  handleInputTitleChange = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };
  handleDeckTitleSubmit = e => {
    e.preventDefault();
    const { title } = this.state;
    const currentTitle = Object.keys(this.props.decks).find(
      title => title === this.state.title
    );

    if (title) {
      if (currentTitle === title) {
        Alert.alert("Title exists, find another title");
      } else {
        This.props.addDeck(title);
        saveDeckTitle(title);
        Alert.alert(`Deck ${title} created!`);
        this.setState({
          title: ""
        });
        This.props.navigation.navigate(DeckDetails, {
          title: title
        });
        this.props.navigation.goBack();
      }
    }
  }; //handleDeckTitleSubmit
  render() {
    const { title } = this.state;
    return (
      <View style={styles.container}>
        <Text> Add New Deck </Text>
        <TextInput
          style={styles.input}
          placeholder="Title Please"
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

function mapStateToProps(state, { props }) {
  return {
    deck_id: props.route.params,
    decks: state.decks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addDeck: title => {
      dispatch(addDeck(title));
    }
  };
}
export default connect(null, mapDispatchToProps)(AddNewDeck);
