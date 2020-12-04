import tw, { styled } from 'twin.macro'
import Button from '../../../../Common/components/Button'

import {
   Typo14DarkBlueGreyHKGroteskSemiBold,
   Typo14BrightBlueHKGroteskSemiBold,
   Typo14DarkBlueGreyHKGroteskRegular
} from '../../../../Common/styleGuide/Typos'
import Colors from '../../../../Common/themes/Colors'

export const LeftEnhancerContainer = styled.div`
   ${tw`flex items-center justify-start w-32px h-full`}
`

export const RightEnhancerContainer = styled.div`
   ${tw`flex items-center justify-end h-full`}
`

export const ListMenuContainer = styled.div`
   ${tw`bg-white flex flex-col rounded-16px pb-16px`}
`

export const ListMenuItem = styled.div`
   ${tw`flex items-center leading-1.71 py-12px cursor-pointer hover:text-darkBlueGrey hover:bg-lightBlueGrey24 rounded-8px mb-5px last:mb-0px`}
`

export const ListMenuText = styled(Typo14DarkBlueGreyHKGroteskRegular)`
   ${tw`pl-16px`}
`

export const CardTitleText = styled(Typo14DarkBlueGreyHKGroteskSemiBold)``

export const MoveCardButton = styled(Button)`
   ${tw`
      bg-transparent mr-12px p-0 border-solid border px-10px
   `}
   border-color: ${props =>
      props.cardLabelTextColor ? props.cardLabelTextColor : Colors.blue};
`

export const MoveCardButtonText = styled(Typo14BrightBlueHKGroteskSemiBold)`
   color: ${props =>
      props.cardLabelTextColor ? props.cardLabelTextColor : Colors.blue};
`
