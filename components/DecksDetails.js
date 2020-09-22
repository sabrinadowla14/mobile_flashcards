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

class DecksDetails extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  handleDeckId = deckId => {
    this.props.navigation.navigate("Decks", { deckId });
  };

  //handleDeckOnPress = (deckId) => this.props.navigation.navigate("Decks", {deckId});

  render() {
    const { decks } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {decks
            ? Object.keys(decks).map(key => {
                return;
                <View key={decks[key].deckId}>
                  <TouchableOpacity onPress={() => this.handleDeckId(deckId)}>
                    <DecksView deck={decks[key]} />
                    })
                    <Text style={styles.Text}>{decks[key].deckTitle}</Text>
                    <Text style={styles.Text}>{decks[key].cards.length}</Text>
                  </TouchableOpacity>
                </View>;
              })
            : null}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, props) => {
  // const { deckId } = props.route.params.id
  const { decks } = state;
  //const { deckId } = this.props.route.params;
  //const deck = decks[deckId];
  //const decksInfo = Object.values(decks || {});

  return {
    decks
    //deckId
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
