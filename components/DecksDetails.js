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
  /*componentDidMount() {
    this.props.handleInitialData();
  }*/
  handleDeckId = title => {
    this.props.navigation.navigate("Decks", { deckTitle });
  };

  //handleDeckOnPress = (deckId) => this.props.navigation.navigate("Decks", {deckId});

  render() {
    const { decks, navigation } = this.props;
    // const { deckId } = this.props.route.params.deckId;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {decks
            ? Object.keys(decks).map(key => {
                return (
                  <View key={decks[key].title}>
                    <TouchableOpacity
                      onPress={() => this.handleDeckId(decks[key].title)}
                    >
                      <DecksView
                        deckId={decks[key].title}
                        title={decks[key].title}
                        totalCardLen={decks[key].questions.length}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })
            : null}
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
