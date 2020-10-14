import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";
import { connect } from "react-redux";
import { pink, blue, white, green } from "../utils/colors";

class Quiz extends React.Component {
  state = {
    index: 0,
    visibleAns: false,
    questions: [],
    totalOfQuestions: this.props.deck.questions.length,
    noOfCorrAns: null,
    noOfIncorrAns: null,
    ansCard: 0
  };
  componentDidMount = () => {
    this.setState({
      ...this.state,
      questions: this.props.deck.questions
    });
  };

  handleQuizAnswer = answer => {
    const { index, quesLength } = this.state;

    if (answer === "ok") {
      this.setState({
        noOfCorrAns: this.state.noOfCorrAns + 1,
        index: this.state.index + 1
      });
    } else {
      this.setState({
        noOfCorrAns: this.state.noOfCorrAns
      });
    }
    if (index + 1 === quesLength) {
      clearLocalNotification().then(setLocalNotification);
      this.setState({ visibleAns: true });
    } else {
      this.setState({ visibleAns: false });
    }
  };

  handleQuizReset = () => {
    this.setState({
      index: 0,
      visibleAns: false,
      questions: [],
      noOfCorrAns: 0,
      noOfIncorrAns: 0,
      ansCard: 0
    });
  };
  render() {
    const { cardCount, title } = this.props;
    const {
      questions,
      visibleAns,
      noOfCorrAns,
      index,
      totalNoOfQues
    } = this.state;

    if (cardCount === 0) {
      return (
        <View style={styles.block}>
          <Text>You don't have any card</Text>
        </View>
      );
    }

    if (this.state.visibleAns === true) {
      const perOfAnsQues = ((noOfCorrAns / totalNoOfQues) * 100).toFixed(0);

      return (
        <View style={styles.block}>
          <View>
            <Text style={styles.headingBlock}>Quiz Complete!</Text>
            <Text style={[styles.textBlock, styles.textRed]}>
              {noOfCorrAns} / {totalNoOfQues} correct
            </Text>
          </View>
          <View>
            <Text style={(styles.textBlock, styles.percent)}>
              Percentage correct
            </Text>
            <Text style={[styles.textBlock, styles.textRed]}>
              {perOfAnsQues}%
            </Text>
            <Text>{this.props.deck.questions[this.state.index].question}</Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  visibleAns: true
                });
              }}
            >
              View Answer
            </TouchableOpacity>
            if (this.state.visibleAns){" "}
            {<Text>{this.props.deck.question[this.state.index].answer}</Text>}
            <Button onPress={() => this.handleQuizAnswer("ok")} />
            <Button onPress={() => this.handleQuizAnswer("Not correct")} />
          </View>
          if (this.state.visibleAns !== true) {this.resetNotification()}
          <Button title="reset" onPress={this.resetQuiz} />
          <View style={styles.btnContainer}>
            <Text style={[styles.btn, styles.btnPink]}>Restart Quiz</Text>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Deck", {
                  itemId: this.deck.title
                });
              }}
            >
              <Text style={[styles.btn, styles.btnPink]}>Go to Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View key={index}>
        <Text style={styles.numberOfQuestions}>
          {index + 1}/{this.state.totalOfQuestions}
        </Text>
        <View>
          <Text style={styles.heading}>
            {showScreen === screen.QUESTION
              ? this.props.deck.questions[this.state.index].question
              : this.props.deck.questions[this.state.index].answer}
          </Text>

          {showScreen === screen.QUESTION ? (
            <TouchableOpacity
              onPress={() => this.setState({ showScreen: screen.ANSWER })}
            >
              <Text style={styles.switchBtn}>Answer</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => this.setState({ showScreen: screen.QUESTION })}
            >
              <Text style={styles.switchBtn}>Question</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => this.handleAnswer(answer.CORRECT, index)}
          >
            <Text style={[styles.btn, styles.btnGreen]}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.handleAnswer(answer.INCORRECT, index)}
          >
            <Text style={[styles.btn, styles.btnPink]}>Incorrect</Text>
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
    color: pink,
    fontWeight: "bold",
    padding: 10
  },
  heading: {
    fontSize: 40,
    textAlign: "center",
    color: pink,
    fontWeight: "bold",
    marginTop: 100
  },
  switchBtn: {
    marginTop: 20,
    color: pink,
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
  btnPink: {
    backgroundColor: pink
  },
  btnBlue: {
    backgroundColor: blue
  },
  btnPink: {
    backgroundColor: pink
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
    color: pink
  }
});

const mapStateToProps = (state, { route }) => {
  const title = route.params.title;
  const deck = state[title];
  return {
    title,
    deck
  };
};

export default connect(mapStateToProps)(Quiz);
