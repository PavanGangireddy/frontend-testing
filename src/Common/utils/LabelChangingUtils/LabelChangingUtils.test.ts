import { getRelatedLabel } from '.'

describe('getRelatedLabel()', () => {
   it('should getRelatedLabel when condition is true ', () => {
      const labelObject = {
         condition: true,
         label1: 'Remove From Starred',
         value1: 'remove from starred',
         label2: 'Star Folder',
         value2: 'star folder',
         data: {
            label: 'Remove From Starred',
            value: 'remove from starred'
         }
      }
      const expectedOutput = 'Remove From Starred'
      getRelatedLabel(labelObject)
      const actualOutPut = labelObject.data.label
      expect(actualOutPut).toBe(expectedOutput)
   })

   it('should getRelatedLabel when condition is false ', () => {
      const labelObject = {
         condition: false,
         label1: 'Remove From Starred',
         value1: 'remove from starred',
         label2: 'Star Folder',
         value2: 'star folder',
         data: {
            label: 'Remove From Starred',
            value: 'remove from starred'
         }
      }
      const expectedOutput = 'Star Folder'
      getRelatedLabel(labelObject)
      const actualOutPut = labelObject.data.label
      expect(actualOutPut).toBe(expectedOutput)
   })
})
