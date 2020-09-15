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

    this.props.addDeck(title);
    this.setState({
      title: ""
    });
    this.props.navigation.navigate("DecksDetails");
  };
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

function mapDispatchToProps(dispatch) {
  return {
    addDeck: title => {
      dispatch(addDeck(title));
    }
  };
}
export default connect(null, mapDispatchToProps)(AddNewDeck);
