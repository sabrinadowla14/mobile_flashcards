import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

class Score extends Component {
  buttonPressedReset = e => {
    this.props.navigation.navigate("Quiz");
  };

  buttonPressedBackToDecks = e => {
    this.props.navigation.navigate("Decks");
  };

  render() {
    const { itemId, correct, numberOfCards } = this.props.route.params;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{itemId}</Text>

        <View style={{ alignItems: "center" }}>
          <View style={styles.card}>
            <Text style={styles.title}>Quiz Completed</Text>

            <Text style={styles.correct}>
              {correct}/{numberOfCards} Correct
            </Text>
            <Text style={{ margin: 10, color: "lightslategrey" }}>
              Percentage correct:{" "}
              <Text style={styles.correct}>
                {((correct / numberOfCards) * 100).toFixed(0) + "%"}
              </Text>
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "crimson", flex: 0.9, height: 60 }
              ]}
              onPress={this.buttonPressedReset}
            >
              <Text style={styles.text}>Reset Quiz</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "gainsboro", flex: 0.9, height: 60 }
              ]}
              onPress={this.buttonPressedBackToDecks}
            >
              <Text style={styles.text}>Back to Decks</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Score;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    backgroundColor: "white",
    width: 500,
    height: 210,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "lightslategrey",
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center"
  },
  correct: {
    color: "red",
    fontSize: 20
  },
  button: {
    alignItems: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 5,
    borderRadius: 5
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 2
  }
});
