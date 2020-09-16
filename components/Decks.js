import React, { Component } from "react";
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import { connect } from "react-redux";
import DecksDetails from "./DecksDetails";
import { getAllDecks } from "../actions";

class Decks extends Component {
  componentDidMount() {
    this.props.getAllDecks();
  }

  render() {
    const { deck } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <DecksDetails
            Key={deck.title}
            title={deck.title}
            navigation={this.props.navigation}
            totalNoOfCards={questions ? deck.questions.length : null}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, { props }) => {
  const { deck } = props.route.params;
  const { decks } = state.decks;
  return {
    deck
  };
};

const mapDispatchToProps = dispatch => ({
  getAllDecks: () => dispatch(getAllDecks())
});

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
