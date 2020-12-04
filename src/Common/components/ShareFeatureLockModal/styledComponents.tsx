import tw, { styled } from 'twin.macro'

import {
   Typo14DarkBlueGreyHKGroteskSemiBold,
   Typo18SteelHKGroteskMedium
} from '../../styleGuide/Typos'

export const ShareLockFeatureContainer = styled.div`
   ${tw`w-493px h-355px flex flex-col bg-white shadow-steel16 border-default border-solid border-lightBlueGrey rounded-4px relative `}
`

export const Header = styled.div`
   ${tw`w-full flex justify-between py-20px`}
`

export const Title = styled(Typo14DarkBlueGreyHKGroteskSemiBold)`
   ${tw`ml-24px uppercase`}
`

export const Divider = styled.div`
   ${tw`border-0 border-b border-solid border-lightBlueGrey`}
`

export const CloseIconContainer = styled.div`
   ${tw`cursor-pointer mr-24px`}
`
export const Body = styled.div`
   ${tw`flex flex-col items-center justify-center flex-grow w-full`};
`

export const LockText = styled(Typo18SteelHKGroteskMedium)`
   ${tw`mt-24px`}
`
