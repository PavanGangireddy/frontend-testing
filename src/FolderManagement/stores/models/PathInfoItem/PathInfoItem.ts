import { PathType } from '../../types'

class PathInfoItem {
   id: string
   name: string
   type: string

   constructor(pathInfo: PathType) {
      const {
         folder_id: folderId,
         folder_name: folderName,
         folder_type: folderType
      } = pathInfo
      this.id = folderId
      this.name = folderName
      this.type = folderType
   }
}

export default PathInfoItem
