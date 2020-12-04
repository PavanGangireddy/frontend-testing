import { getFirstTwoLettersInUpperCase, trimName } from '.'

describe('getFirstTwoLettersInUpperCase()', () => {
   it('should give firstTwo letters of string', () => {
      const expectedOutput = 'NA'
      const actualOutput = getFirstTwoLettersInUpperCase('name')
      expect(actualOutput).toBe(expectedOutput)
   })
})

describe('trimName()', () => {
   it('should return given name', () => {
      const name = 'Sample name for testing'
      const returnedName = trimName(name, 50)
      expect(returnedName).toBe(name)
   })

   it('should return trimmed name', () => {
      const name =
         'Sample name for testing overflow test and this name contains chars greater than 50'
      const returnedName = trimName(name, 50)
      expect(returnedName).toBe(`${name.slice(0, 47)}...`)
   })
})
