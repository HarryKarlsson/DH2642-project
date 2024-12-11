import { useRouter } from 'vue-router';
import { QuizPageView } from '../views/quizPageView';

function QuizPagePresenter() {
    const router = useRouter();
    return <QuizPageView router={router} />;
}

export default QuizPagePresenter;