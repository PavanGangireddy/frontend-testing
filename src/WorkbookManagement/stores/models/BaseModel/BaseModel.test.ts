import BaseModel from './BaseModel'

const sampleData = {
   id: '1',
   name: 'Sample Data'
}

describe('BaseModel test cases', () => {
   it('should initialize base model with given data', () => {
      const baseModel = new BaseModel(sampleData)

      expect(baseModel.id).toBe('1')
      expect(baseModel.name).toBe('Sample Data')
   })
})
