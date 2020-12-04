import { getFileExtension } from '.'

describe('FileUploader Utils', () => {
   it('should test if we get file extension from file name ', () => {
      expect(getFileExtension('index.tsx', '')).toBe('tsx')
   })

   it('should test if we get file extension from file type ', () => {
      expect(getFileExtension('', 'application/json')).toBe('json')
   })

   it('should test if we get empty string when nothing is present ', () => {
      expect(getFileExtension('', '')).toBe('')
   })
})
