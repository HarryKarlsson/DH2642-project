import { getHighestScore } from "../firebaseModel";
import "../css/profile.css";

export default {
    data() {
        return {
            playerName: "",
            bestScore: 0
        };
    },
    
    async mounted() { // 
        try {
            const scoreData = await getHighestScore();
            console.log("Score data:", scoreData);

            this.playerName = scoreData[0];
            this.bestScore = scoreData[1];
        } catch (error) {
            console.error("Error fetching high score:", error);
        }
    },

    render() {
        return (
            <div className="profile">
                <h1>Highest Score</h1>
                <div className="profile-info">
                    <h2>Player Name</h2>
                    <p>{this.playerName}</p>
                </div>
                <div className="profile-stats">
                    <h3>Stats</h3>
                    <div>
                        <p>Score: {this.bestScore}</p>
                    </div>
                </div>
            </div>
        );
    }
};