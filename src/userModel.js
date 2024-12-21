import { increment } from 'firebase/database';
import { reactive } from 'vue';
import { updateStateToFirebase, loadStateFromFirebase } from '/src/firebaseModel';
const userModel = {
  data: reactive({
    userName: "",
    userEmail: "",
    isSignedIn: false,
    userScore: 0,
    quizScore: 0,
    isNewUser: false,
    userState: {
      path: "",
      region: "",
      quizCountries: [],
      currentQuizIndex: 0,
      questionType: "flag",
      currentQuestion: null,
      quizCompleted: false,
      hint: "",
      quizScore: 0
  },

  }),

    setQuizState(quizState) {
      this.data.userState = {
        ...this.data.userState,
        ...quizState
      }
  
      updateStateToFirebase(this.data.userState);
  },

  getQuizState() {
      return this.data.userState;
  },

  setUserName(name) {
    this.data.userName = name;
  },

  setUserEmail(email) {
    this.data.userEmail = email;
  },

  setIsSignedIn(status) {
    this.data.isSignedIn = status;
  },

  setUserScore(score) {
    if (score < 0){
      return;
    }
    this.data.userScore = score;
  },

  setIsNewUser(status) {
    this.data.isNewUser = status;
  },

  incrementScore() {
    this.data.userScore += 1;
  },

  // decrementScore() {
  //   this.setUserScore(this.data.userScore -= 1);
  // },
  compareScore(quizScore, userScore) {
    if (quizScore > userScore) {
      this.setUserScore(quizScore);
    }

  },

  setQuizScore(score) {
    this.data.quizScore = score;
  },

  incrementQuizScore() {
    this.data.quizScore += 1;
  },

  getQuizScore() {
    return this.data.quizScore;
  },

  resetQuizScore() {
    this.data.quizScore = 0; 
  },


  

};

export default userModel;