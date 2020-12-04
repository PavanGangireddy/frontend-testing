import {
   TABLET_MIN_WIDTH,
   DESKTOP_MIN_WIDTH
} from '../constants/ResponsiveConstants'

//TODO: need to update this responsive utils
export const isMobileDevice =
   typeof window !== 'undefined' &&
   typeof document !== 'undefined' &&
   window.innerWidth < TABLET_MIN_WIDTH

export const isTabletDevice =
   typeof window !== 'undefined' &&
   typeof document !== 'undefined' &&
   window.innerWidth >= TABLET_MIN_WIDTH &&
   window.innerWidth < DESKTOP_MIN_WIDTH

export const customMaxWidth = maxWidth => {
   if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      if (window.innerWidth <= maxWidth) {
         return true
      }
   }
   return false
}
