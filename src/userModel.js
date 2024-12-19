import { increment } from 'firebase/database';
import { reactive } from 'vue';

const userModel = {
  data: reactive({
    userName: "",
    userEmail: "",
    isSignedIn: false,
    userScore: 0,
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
  }
};

export default userModel;