import tw, { styled } from 'twin.macro'
import {
   Typo14DarkBlueGreyHKGroteskSemiBold,
   Typo14DarkBlueGreyHKGroteskRegular
} from '../../../Common/styleGuide/Typos'

export const ActionsContainer = styled.div`
   ${tw`
   bg-white flex flex-col pt-16px pb-8px
    `}
`

export const Item = styled.div`
   ${tw`
   flex items-center leading-1.71 py-12px cursor-pointer hover:text-darkBlueGrey hover:bg-lightBlueGrey24 rounded-8px mb-5px last:mb-0px
    `}
`

export const ItemText = styled(Typo14DarkBlueGreyHKGroteskRegular)``

export const TitleText = styled(Typo14DarkBlueGreyHKGroteskSemiBold)``
