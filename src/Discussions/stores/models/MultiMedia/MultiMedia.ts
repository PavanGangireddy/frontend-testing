import { observable, action } from 'mobx'

import { MultiMediaResponseObjectType } from '../../types'

export default class MultiMedia {
   id
   formatType
   @observable fileName = ''

   @observable url = ''

   constructor(media?: MultiMediaResponseObjectType) {
      if (media) {
         this.id = media.multimedia_id
         this.formatType = media.format_type
         this.url = media.url
      }
   }

   @action.bound
   getMultimediaItem() {
      return {
         id: this.id,
         url: this.url,
         formatType: this.formatType
      }
   }
}
