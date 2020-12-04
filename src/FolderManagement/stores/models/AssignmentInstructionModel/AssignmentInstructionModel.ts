import { AssignmentInstructionsResponse } from '../../types'

class AssignmentInstructionModel {
   objective: string | null
   description: string | null

   constructor(assignmentInstructions: AssignmentInstructionsResponse) {
      const { objective, description } = assignmentInstructions
      this.objective = objective
      this.description = description
   }
}

export default AssignmentInstructionModel
