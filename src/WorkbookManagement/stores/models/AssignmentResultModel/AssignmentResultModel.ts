import { AssignmentSubmitResponse } from '../../types'

class AssignmentResultModel {
   totalScore: number
   userScore: number
   correctAnswersCount: number
   wrongAnswersCount: number

   constructor(result: AssignmentSubmitResponse) {
      const {
         total_score: totalScore,
         user_score: userScore,
         correct_answers: correctAnswers,
         wrong_answers: wrongAnswers
      } = result
      this.totalScore = totalScore
      this.userScore = userScore
      this.correctAnswersCount = correctAnswers
      this.wrongAnswersCount = wrongAnswers
   }
}

export default AssignmentResultModel
