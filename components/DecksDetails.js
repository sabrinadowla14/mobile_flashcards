import React, { Component } from "react";
import {
  Button,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { white } from "../utils/colors";

import { handleInitialData } from "../actions";
import DecksView from "./DecksView";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getDecksAsync } from "../utils/api";
import { receiveDecks } from "../actions";

class DecksDetails extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    getDecksAsync().then(decks => dispatch(receiveDecks(decks)));
  }
  /*handleDeckId = title => {
    this.props.navigation.navigate("Decks", {
      itemId: deck.title
    });
  };
*/
  //handleDeckOnPress = (deckId) => this.props.navigation.navigate("Decks", {deckId});

  render() {
    const { decks, navigation } = this.props;
    // const { deckId } = this.props.route.params.deckId;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {Object.values(decks) !== undefined ? (
            Object.values(decks).map(deck => (
              <DecksView
                key={deck.title}
                //title={deck.title}
                navigation={this.props.navigation}
                id={deck.title}
                cardCount={deck.questions.length}
              />
            ))
          ) : (
            <Text>We don't have any decks</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  //const { deckId } = props.route.params.deckId;
  const { decks } = state;
  //const { deckId } = this.props.route.params.deckId;
  //const deck = decks[deckId];
  //const decksInfo = Object.values(decks || {});

  return {
    decks
  };
};

export default connect(mapStateToProps, {})(DecksDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20
  },

  text: {
    fontSize: 42,
    textAlign: "center"
  }
});
