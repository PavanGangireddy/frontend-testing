export const getFileExtension = (fileName: string, fileType: string): string =>
   (fileName && fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2)) ||
   (fileType && fileType.slice(((fileType.lastIndexOf('/') - 1) >>> 0) + 2))
