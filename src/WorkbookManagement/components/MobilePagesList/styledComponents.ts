import tw, { styled } from 'twin.macro'

import {
   Typo14DarkBlueGreyHKGroteskSemiBold,
   Typo14DarkBlueGreyHKGroteskRegular
} from '../../../Common/styleGuide/Typos'
import Button from '../../../Common/components/Button'

export const PagesContainer = styled.div`
   ${tw`
   bg-white flex flex-col py-16px
    `};
`

export const PageItem = styled.div`
   ${tw`
        flex  items-center justify-between hover:text-darkBlueGrey hover:bg-lightBlueGrey24 rounded-8px mb-5px last:mb-0px
    `};
`

export const TitleText = styled(Typo14DarkBlueGreyHKGroteskSemiBold)``

export const NormalText = styled(Typo14DarkBlueGreyHKGroteskRegular)``

export const AddPageButton = styled(Button)`
   ${tw`
        self-start flex items-center pl-0 bg-transparent mt-16px
    `}
`

export const AddButtonText = styled(NormalText)`
   ${tw`
        ml-4px
    `}
`
