import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { white, blue, red, green, purple } from "../utils/colors";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

class Quiz extends React.Component {
  state = {
    questions: [],

    index: 0,
    noOfCorrectAns: 0,
    noOfIncorrectAns: 0,
    visibleAns: false,
    totalNoOfQuestions: 0
  };

  componentDidMount = () => {
    this.setState({
      ...this.state,
      questions: this.props.deck.questions
    });
  };

  handlePageChange = () => {
    this.setState({
      visibleAns: true
    });
  };
  handleQuizAnswer = answer => {
    const { index, totalNoOfQuestions, noOfCorrectAns } = this.state;
    const { cardCount } = this.props;

    if (answer === quizVar) {
      this.setState({
        noOfCorrectAns: this.state.noOfCorrectAns + 1,
        index: this.state.index + 1,
        visibleAns: true
      });
    } else {
      this.setState({
        noOfCorrectAns: this.state.noOfCorrectAns,
        visibleAns: false,
        userAns: null,
        quizVar: "Not OK"
      });
    }

    if (index + 1 === cardCount) {
      clearLocalNotification().then(setLocalNotification);
      this.setState({ visibleAns: true });
    } else {
      this.setState({ visibleAns: false });
    }
  };
  resetQuiz = () => {
    this.setState({
      visibleAns: false,
      noOfCorrectAns: 0,
      noOfIncorrectAns: 0,
      usersAns: null,
      userAns: 0,
      index: 0,
      quizVar: "OK"
    });
  };
  render() {
    const {
      questions,
      visibleAns,
      index,
      noOfCorrectAns,
      totalNoOfQuestions
    } = this.state;
    const { itemId, cardCount, deck, decks } = this.props;

    if (cardCount === 0) {
      return (
        <View style={styles.block}>
          <Text>You don't have any deck! Sorry</Text>
        </View>
      );
    }

    if (this.state.visibleAns === true) {
      const percent = (noOfCorrectAns / cardCount) * 100;
      const { itemId, carCount, deck, decks } = this.props;
      return (
        <View style={styles.block}>
          <View>
            <Text style={styles.headingBlock}>Done Quiz !</Text>
            <Text style={[styles.textBlock, styles.textRed]}>
              {noOfCorrectAns} / {cardCount} correct
            </Text>
          </View>
          <View>
            <Text style={(styles.textBlock, styles.percent)}>Result in %</Text>
            <Text style={[styles.textBlock, styles.textRed]}>{percent}%</Text>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.replace("Quiz", { itemId: itemId })
              }
            >
              <Text style={[styles.btn, styles.btnRed]}>Start Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Text style={[styles.btn, styles.btnGreen]}>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Home");
              }}
            >
              <Text style={[styles.btn, styles.btnPurple]}>Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View key={index}>
        <Text style={styles.numberOfQuestions}>
          {index + 1}/{this.props.cardCount}
        </Text>
        <View style={{ alignItems: "center" }}>
          {this.state.showAnswer ? (
            <View style={styles.card}>
              <Text style={styles.title}>Answer</Text>
              <Text>
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
              <Text style={styles.switchBtn}>Answer</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => this.setState({ visibleAns: false })}
            >
              <Text style={styles.switchBtn}>Question</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => this.handleQuizAnswer("OK")}>
            <Text style={[styles.btn, styles.btnGreen]}>Correct</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => this.handleQuizAnswer("NOT OK")}>
            <Text style={[styles.btn, styles.btnGreen]}>In Correct</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "space-around"
  },
  numberOfQuestions: {
    color: purple,
    fontWeight: "bold",
    padding: 10
  },
  heading: {
    fontSize: 40,
    textAlign: "center",
    color: purple,
    fontWeight: "bold",
    marginTop: 100
  },
  switchBtn: {
    marginTop: 20,
    color: red,
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
    width: 100
  },
  btnGreen: {
    backgroundColor: green
  },
  btnRed: {
    backgroundColor: red
  },
  btnBlue: {
    backgroundColor: blue
  },
  btnPurple: {
    backgroundColor: purple
  },
  block: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  headingBlock: {
    fontSize: 40,
    textAlign: "center",
    color: green,
    fontWeight: "bold"
  },
  textBlock: {
    fontSize: 20,
    textAlign: "center",
    padding: 10,
    fontWeight: "bold"
  },
  percent: {
    fontSize: 25,
    paddingTop: 20
  },
  textRed: {
    color: red
  }
});

/*const mapStateToProps = (state, { route }) => {
  const title = route.params.title;
  const deck = state[title];
  return {
    title,
    deck
  };
};*/
const mapStateToProps = (state, ownProps) => {
  const { itemId, cardCount } = ownProps.route.params;
  const decks = state;

  return {
    // itemId: JSON.parse(JSON.stringify(itemId)),
    // cardCount: JSON.parse(JSON.stringify(cardCount)),
    itemId,
    cardCount,
    decks: state,
    deck: decks[itemId]
  };
};

export default connect(mapStateToProps)(Quiz);
