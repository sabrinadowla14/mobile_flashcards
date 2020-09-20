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
import Decks from "./Decks";

class DecksDetails extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    const { decksInfo, deck, decks, count } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {decksInfo.length ? (
            decksInfo.map(deck => (
              <Decks
                id={deck.title}
                title={deck.title}
                navigation={this.props.navigation}
                totalNoOfCards={deck.questions.length}
              />
            ))
          ) : (
            <View style={[{ flex: 1 }, styles.container]}>
              <View style={[{ flex: 1 }, styles.row]}>
                <Text style={styles.noDataText}>You have no decks yet!</Text>
              </View>
            </View>
          )}
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
  },
  row: {
    backgroundColor: white,
    borderRadius: 16,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    }
  }
});
