import tw, { styled, TwStyle } from 'twin.macro'

import { Typo14WhiteHKGroteskRegular } from '../../../Common/styleGuide/Typos'
import Button from '../../../Common/components/Button'

export const AddListContainer = styled.div`
   ${tw`
        w-full flex flex-col bg-white rounded-4px p-8px border border-solid border-lightBlueGrey
    `}
   height:fit-content;
`

export const ButtonsContainer = styled.div`
   ${tw`
        flex items-center mt-8px
    `}
`

export const AddListButton = styled(Button)`
   ${tw`
        flex items-center focus:outline-none bg-brightBlue rounded-4px py-8px px-20px
    `}
`

export const AddListButtonText = styled(Typo14WhiteHKGroteskRegular)`
   ${tw`
        ml-8px leading-1.71
    `}
`

interface CancelButtonContainerProps {
   isDisabled: boolean
}

export const CancelButtonContainer = styled.button`
   ${(props: CancelButtonContainerProps): TwStyle =>
      props.isDisabled ? tw`cursor-not-allowed` : tw`cursor-pointer`}
   ${tw`
        ml-16px focus:outline-none
    `}
`
