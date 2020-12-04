import tw, { styled, css, TwStyle } from 'twin.macro'

import Button from '../../../Common/components/Button'
import { customDevice } from '../../../Common/utils/MixinUtils'

export const ShortNavBarContainer = styled.div`
   ${tw`flex flex-col px-12px justify-between pt-8px pb-40px items-center                                                                                                                                                                                                         h-full bg-darkBlueGrey z-10
      fixed top-0 left-0
   `}
   ${(props): TwStyle =>
      props.shouldDisplayViewInChromeMessageBanner ? tw`top-80px` : tw`top-0`}
      height: ${props =>
         props.shouldDisplayViewInChromeMessageBanner
            ? 'calc(100% - 80px)'
            : '100%'}
`

export const SubFilterContainer = styled.div`
   ${tw`flex flex-col items-center justify-center`}
`

export const IconContainer = styled.div`
   ${tw`flex items-center justify-center  rounded-full cursor-pointer my-20px`}
`
export const AddPeopleContainer = styled.div`
   ${tw`cursor-pointer`}
`

export const LogoContainer = styled.div`
   ${tw`my-32px`}
`
