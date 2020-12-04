import { action, observable } from 'mobx'

class WelcomeMessageUIStore {
   @observable shouldShowWelcomeMessage: boolean

   constructor() {
      this.shouldShowWelcomeMessage = true
   }

   @action.bound
   hideWelcomeMessage(): void {
      this.shouldShowWelcomeMessage = false
   }
}

export default WelcomeMessageUIStore
