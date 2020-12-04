import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import getChecklistResponse from '../../fixtures/get-checklist-response.json'

import ChecklistService from '.'

export default class ChecklistFixtureService implements ChecklistService {
   getChecklist = _request => resolveWithTimeout(getChecklistResponse)

   postChecklistItem = _newItem =>
      resolveWithTimeout({ checklist_item_id: 'iBCLI_001' })

   putChecklistItem = (_itemId, updatedItem) => resolveWithTimeout({})

   removeChecklistItemAPI = () => resolveWithTimeout({})
}
