import React, { Component } from "react";
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import { connect } from "react-redux";
import DecksDetails from "./DecksDetails";

class Decks extends Component {
  render() {
    const { id, deck } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <DecksDetails
            Key={deck.title}
            deck_title={deck.title}
            navigation={this.props.navigation}
            totalNoOfCards={questions ? deck.questions.length : null}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, { props }) => {
  const { id } = props.route.params;
  const { decks } = state.decks;
  return {
    deck: decks ? decks[id] : null,
    id
  };
};

export default connect(mapStateToProps)(Deck);

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
