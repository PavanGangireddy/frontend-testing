import { validateEmpty } from './index'

describe('Common Validation Utils test cases', () => {
   it('should test for empty validation', () => {
      const emptyString = '       '
      const nonEmptyString = 'mypas'
      expect(validateEmpty(emptyString).shouldShowError).toBe(true)
      expect(validateEmpty(nonEmptyString).shouldShowError).toBe(false)
   })
})
