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
  handleTouch = id => {
    navigation.navigate("DeckDetail", { id });
  };
  render() {
    const { deck, decksInfo } = this.props;
    return (
      <View>
        {decksInfo.map(deck => (
          <View>
            <Text>
              {" "}
              style={styles.titleList}
              {deck.title}
            </Text>
            <Text>{deck.questions.length} cards</Text>
          </View>
        ))}
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

function mapStateToProps({ state }) {
  const decks = state;
  const decksInfo = Object.values(decks || {});
  const deck = Object.keys(decksInfo).map((key, i) => {
    decksInfo[key];
  });
  return {
    //decks: state,
    deck,
    decksInfo
  };
}

export default connect(mapStateToProps)(DecksView);
