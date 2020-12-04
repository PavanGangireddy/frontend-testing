import { observable, action } from 'mobx'

class ChromeBannerUIStore {
   @observable shouldDisplayViewInChromeMessageBanner!: boolean

   constructor() {
      this.init()
   }

   @action.bound
   init() {
      this.shouldDisplayViewInChromeMessageBanner = true
   }

   @action.bound
   closeChromeBanner() {
      this.shouldDisplayViewInChromeMessageBanner = false
   }

   @action.bound
   clearStore() {
      this.init()
   }
}

export default ChromeBannerUIStore
