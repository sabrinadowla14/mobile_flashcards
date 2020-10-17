import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { white, blue, red, green, purple, maroon } from "../utils/colors";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

class Quiz extends React.Component {
  state = {
    index: 0,
    noOfCorrectAns: 0,
    noOfIncorrectAns: 0,
    visibleAns: false,
    totalNoOfQuestions: 0
  };

  handleQuizAnswer = value => {
    const { index, totalNoOfQuestions, noOfCorrectAns } = this.state;
    const { cardCount } = this.props;

    if (value === "ok") {
      this.setState({
        noOfCorrectAns: this.state.noOfCorrectAns + 1,
        index: this.state.index + 1,
        visibleAns: true
      });
    } else {
      this.setState({
        noOfCorrectAns: this.state.noOfCorrectAns,
        visibleAns: false
      });
    }

    if (index + 1 === cardCount) {
      clearLocalNotification().then(setLocalNotification);
      this.setState({ visibleAns: true });
    } else {
      this.setState({ visibleAns: false });
    }
  };

  startQuiz = () => {
    this.setState({
      visibleAns: false,
      noOfCorrectAns: 0,
      noOfIncorrectAns: 0,
      index: 0
    });
  };
  render() {
    const { visibleAns, index, noOfCorrectAns } = this.state;
    const { itemId, cardCount, deck, decks } = this.props;

    if (cardCount === 0) {
      return (
        <View style={styles.block}>
          <Text>You don't have any deck! Sorry</Text>
        </View>
      );
    }

    if (this.state.visibleAns === true) {
      const noOfCorrectAns = this.state.noOfCorrectAns + 1;
      const percentageCheck = (noOfCorrectAns / cardCount) * 100;

      return (
        <View style={styles.block}>
          <View>
            <Text style={styles.heading}>You completed your Quiz !</Text>
            <Text style={styles.title}>
              Correct Answer is: {noOfCorrectAns} / {cardCount}
            </Text>
          </View>
          <View>
            <Text style={styles.title}>
              Output in percentage: {percentageCheck}%
            </Text>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={() => {
                this.startQuiz();
              }}
            >
              <Text style={[styles.btnStart]}>Start Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Decks", {
                  itemId: this.props.decks[itemId].title
                });
              }}
            >
              <Text style={[styles.title]}>Go To Decks</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View key={index}>
        <Text style={styles.cardCount}>
          {index + 1}/{this.props.cardCount}
        </Text>
        <View style={{ alignItems: "center" }}>
          {this.state.visibleAns ? (
            <View style={styles.card}>
              <Text style={styles.title}>Answer</Text>
              <Text style={styles.title}>
                {decks[itemId] &&
                  decks[itemId].questions[this.state.index] &&
                  decks[itemId].questions[this.state.index].answer}
              </Text>
            </View>
          ) : (
            <View style={styles.card}>
              <Text style={styles.title}>Question</Text>

              <Text>
                {decks[itemId] &&
                  decks[itemId].questions[this.state.index] &&
                  decks[itemId].questions[this.state.index].question}
              </Text>
            </View>
          )}

          {visibleAns === false ? (
            <TouchableOpacity
              onPress={() => this.setState({ visibleAns: true })}
            >
              <Text style={styles.title}>Answer</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => this.setState({ visibleAns: false })}
            >
              <Text style={styles.title}>Question</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => this.handleQuizAnswer("OK")}>
            <Text style={styles.btn}>Correct</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => this.handleQuizAnswer("NOT OK")}>
            <Text style={styles.btn}>Not Correct</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 17,
    justifyContent: "center"
  },
  cardCount: {
    color: "#148F77",
    fontWeight: "bold",
    padding: 10
  },
  heading: {
    fontSize: 40,
    textAlign: "center",
    color: green,
    fontWeight: "bold",
    marginTop: 100
  },
  title: {
    marginTop: 25,
    color: "#E680AA",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  },
  btnContainer: {
    marginTop: 20,
    alignItems: "center"
  },
  btn: {
    backgroundColor: blue,
    color: white,
    fontSize: 17,
    textAlign: "center",
    padding: 10,
    margin: 5,
    borderRadius: 2,
    height: 45,
    width: 120
  },
  btnTitle: {
    backgroundColor: green,
    color: white,
    fontSize: 17,
    textAlign: "center",
    padding: 10,
    margin: 5,
    borderRadius: 2,
    height: 45,
    width: 120
  },
  btnStart: {
    backgroundColor: maroon,
    color: white,
    fontSize: 17,
    textAlign: "center",
    padding: 10,
    margin: 5,
    borderRadius: 2,
    height: 45,
    width: 120
  },

  block: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  textBlock: {
    fontSize: 20,
    textAlign: "center",
    padding: 10,
    fontWeight: "bold"
  }
});

const mapStateToProps = (state, props) => {
  const { itemId, cardCount } = props.route.params;
  const decks = state;

  return {
    itemId,
    cardCount,
    decks: state,
    deck: decks[itemId]
  };
};

export default connect(mapStateToProps)(Quiz);
