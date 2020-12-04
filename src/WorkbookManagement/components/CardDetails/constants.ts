export const inputFieldType = {
   text: 'text'
}

export const deletePopOver = {
   actionType: 'DELETE'
}

export enum SELECTED_TAB {
   DISCUSSIONS = 'DISCUSSIONS',
   CHECKLIST = 'CHECKLIST'
}

export const tabs = [
   {
      label: 'Discussions',
      value: SELECTED_TAB.DISCUSSIONS
   },
   {
      label: 'Checklist',
      value: SELECTED_TAB.CHECKLIST
   }
]
