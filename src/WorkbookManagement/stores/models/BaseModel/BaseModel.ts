import { observable } from 'mobx'

import { BaseModelObjectType } from '../../types'

class BaseModel {
   id: string
   @observable name: string

   constructor({ id, name }: BaseModelObjectType) {
      this.id = id
      this.name = name
   }
}

export default BaseModel
