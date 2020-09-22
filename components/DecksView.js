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
  /* handleTouch = id => {
    navigation.navigate("DeckDetail", { id });
  };*/
  buttonPressed = e => {
    this.props.navigation.navigate("DecksDetails", {
      deckId: this.props.route.params.deckId
    });
  };
  render() {
    const { cards } = this.props;
    const { deckId } = this.props.route.params;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.buttonPressed}>
          <Text
            style={{
              color: "lightslategrey",
              fontWeight: "bold",
              fontSize: 20,
              paddingBottom: 20
            }}
          >
            {deckId}
          </Text>
          <Text style={{ color: "lightslategrey", fontSize: 15 }}></Text>
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

function mapStateToProps({ state, props }) {
  const { deckId } = props.route.params.deckId;
  const { decks } = state;
  const { cards } = decks[deck.deckId];

  return {
    //decks: state,
    deck,
    deckId,
    cards: cards,
    deck: decks[deckId],
    title: deck.title
  };
}

export default connect()(DecksView);
