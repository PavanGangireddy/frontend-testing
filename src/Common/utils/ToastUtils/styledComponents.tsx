import tw, { styled } from 'twin.macro'

import {
   Typo16NeonRedHKGroteskMedium,
   Typo16GreenishTealHKGroteskMedium,
   Typo12WhiteHKGroteskRegular,
   Typo12NeonRedHKGroteskRegular
} from '../../styleGuide/Typos'

import { isMobileDevice } from '../responsiveUtils'

export const ErrorIconContainer = styled.div`
   ${tw`ml-24px my-16px mr-16px`}
   ${isMobileDevice && tw`m-0 mr-16px`}
`

export const SuccessIconContainer = styled.div`
   ${tw`ml-24px my-16px mr-16px`}
   ${isMobileDevice && tw`hidden`}
`

export const CloseIconContainer = styled.div`
   ${tw`ml-24px mr-24px`}
   ${isMobileDevice && tw`mx-0 ml-16px`}
`
export const ErrorMessage = styled(Typo16NeonRedHKGroteskMedium)`
   ${tw``}
`

export const ToastContainer = styled.div`
   ${tw`
      w-full flex items-center
   `}
   ${isMobileDevice && tw`p-8px`}
`
export const SuccessMessage = styled(Typo16GreenishTealHKGroteskMedium)`
   ${tw``}
`

export const MobileSuccessMessage = styled(Typo12WhiteHKGroteskRegular)`
   ${tw`max-w-250px`}
`

export const MobileFailureMessage = styled(Typo12NeonRedHKGroteskRegular)`
   ${tw`max-w-200px`}
`
