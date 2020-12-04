/**
 * @flow
 */

import tw, { styled } from 'twin.macro'

import Button from '../Button'
import {
   Typo16DarkBlueGreyHKGroteskRegular,
   Typo14WhiteHKGroteskSemiBold,
   Typo18DarkBlueGreyHKGroteskMedium
} from '../../styleGuide/Typos'

export const MainContainer = styled('div')`
   ${tw`flex flex-col bg-white border border-solid border-lightBlueGrey rounded-16px p-25px relative shadow-steel16 max-w-300px sm:max-w-360px box-border`}
`

export const StyledIconContainer = styled('div')`
   ${tw`flex items-center justify-center w-16px h-16px cursor-pointer absolute top-24px right-24px`}
`
export const HeadingContainer = styled('div')`
   ${tw`flex pb-12px border-0 border-b border-solid border-lightBlueGrey`}
`

export const PopupHeading = styled(Typo18DarkBlueGreyHKGroteskMedium)`
   ${tw`leading-1.78 ml-16px`}
`

export const ContentMainContainer = styled('div')`
   ${tw`flex flex-col mt-24px`}
`

export const DescriptionText = styled(Typo16DarkBlueGreyHKGroteskRegular)`
   ${tw`leading-1.71`}
`
export const FooterMainContainer = styled('div')`
   ${tw`flex justify-end mt-24px`}
`
export const DismissBtn = styled(Button)``
export const DismissBtnText = styled(Typo14WhiteHKGroteskSemiBold)`
   ${tw`leading-1.71`}
`
