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

import { handleInitialData } from "../actions";
import Decks from "./Decks";

class DecksDetails extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    const { decksInfo, deck, decks } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {decksInfo.map(deck => (
            <Decks
              //id={deck.title}
              title={deck.title}
              navigation={this.props.navigation}
              totalNoOfCards={deck.questions.length}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  // const { deckId } = props.route.params.id
  const { decks } = state;

  //const deck = decks[deckId];
  const decksInfo = Object.values(decks || {});
  const deck = Object.keys(decksInfo).map((key, i) => {
    decksInfo[key];
  });
  return {
    decksInfo: decksInfo !== undefined ? decksInfo : null,
    decks
  };
};

export default connect(mapStateToProps, { handleInitialData })(DecksDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20
  },
  text: {
    fontSize: 42
  }
});
