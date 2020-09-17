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
import DecksDetails from "./DecksDetails";
import { handleInitialData } from "../actions";

class Decks extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    const { decksInfo } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {decksInfo.map(deck => (
            <DecksDetails
              id={deck.title}
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

const mapStateToProps = (state, { props }) => {
  // const { deckId } = props.route.params.id
  const { decks } = state;

  //const deck = decks[deckId];
  const decksInfo = Object.values(decks || {});
  return {
    decksInfo: decksInfo !== undefined ? decksInfo : null
    //deck
  };
};

export default connect(mapStateToProps, { handleInitialData })(Decks);

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
