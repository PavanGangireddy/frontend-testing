import { UserGuideMultimedia } from '../../types'

class InstructionsMultimedia {
   multimediaUrl
   formatType

   constructor(multimedia: UserGuideMultimedia) {
      const {
         multimedia_url: multimediaUrl,
         format_type: formatType
      } = multimedia
      this.multimediaUrl = multimediaUrl
      this.formatType = formatType
   }
}

export default InstructionsMultimedia
