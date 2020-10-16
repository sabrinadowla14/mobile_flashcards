import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { white, gray, black } from "../utils/colors";

class DecksView extends Component {
  handleDeck = e => {
    this.props.navigation.navigate(
      "Decks",
      { itemId: this.props.id },
      { cardCount: this.props.deck.questions.length }
    );
  };

  render() {
    const { id, cardCount, title, deck } = this.props;

    //const title = this.props.route.params;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleDeck()}
        >
          <Text
            style={{
              color: "lightslategrey",
              fontWeight: "bold",
              fontSize: 20,
              paddingBottom: 20
            }}
          >
            Title {id}
          </Text>
          <Text style={{ color: "lightslategrey", fontSize: 15 }}>
            Total {deck.questions.length} cards.
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 35,
    backgroundColor: white
  },
  input: {
    paddingLeft: 10,
    marginTop: 15,
    height: 45,
    borderRadius: 5,
    borderColor: gray,
    borderWidth: 1
  },
  button: {
    marginTop: 15,
    borderRadius: 16
  },
  title: {
    fontSize: 30,
    fontWeight: "bold"
  },
  titleList: {
    fontSize: 20,
    fontWeight: "bold",
    color: black
  },
  noDataText: {
    textAlign: "center",
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
});

/*function mapStateToProps(state, { id }) {
  //const { deckId } = props.route.params.deckId;
  const { decks } = state;
  const { deck } = decks[id];
  const title = deck.title;
  //const cardCount = deck.questions.length;

  return {
    //decks: state,

    cardCount,
    id
  };
}*/

export default DecksView;
