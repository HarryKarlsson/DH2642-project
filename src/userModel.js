import { increment } from 'firebase/database';
import { reactive } from 'vue';
const userModel = {
  data: reactive({
    userName: "",
    userEmail: "",
    isSignedIn: false,
    userScore: 0,
    quizScore: 0,
    isNewUser: false,
  }),

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
    this.data.userScore = score;
  },

  setIsNewUser(status) {
    this.data.isNewUser = status;
  },

  incrementScore() {
    this.data.userScore += 1;
  },

  decrementScore() {
    this.data.userScore -= 1;
  },
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
  }



  

};

export default userModel;