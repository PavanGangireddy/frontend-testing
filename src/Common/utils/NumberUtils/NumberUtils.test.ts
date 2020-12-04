import { getRandomNumber } from '.'

describe('NumberUtils', () => {
   it('should return  a random number from given range', () => {
      const number = getRandomNumber(5, 200)
      expect(number).toBeGreaterThan(4)
      expect(number).toBeLessThan(201)
   })
})
