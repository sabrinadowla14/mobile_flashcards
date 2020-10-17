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
    this.props.handleInitialData();
  }

  render() {
    const { decks, navigation } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {decks
            ? Object.values(decks) &&
              Object.values(decks).map(deck => (
                <DecksView
                  key={deck.title}
                  navigation={this.props.navigation}
                  deckId={deck.title}
                  cardCount={deck.questions.length}
                  deck={deck}
                />
              ))
            : null}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  const decks = state;

  return {
    decks
  };
};

export default connect(mapStateToProps, { handleInitialData })(DecksDetails);

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
