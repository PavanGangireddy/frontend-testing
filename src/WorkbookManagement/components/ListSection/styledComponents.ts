import tw, { styled, TwStyle } from 'twin.macro'

import { Typo14BlueGreyHKGroteskRegular } from '../../../Common/styleGuide/Typos'

export const SectionContainer = styled.div`
   ${tw`
        w-full flex flex-col bg-paleGrey border-0 border-solid border-lightBlueGrey bg-white 
    `};
   ${props => (props.isFirstSection ? tw`border-t-0` : tw`border-t-2`)}
`

export const DroppableSection = styled.div``

export const DraggableCard = styled.div`
   ${tw`
        max-w-full
    `}
`

export const SectionCardsContainer = styled.div`
   ${({ isCollapsed }): TwStyle => (isCollapsed ? tw`p-0` : tw`px-4px pb-8px`)}
   ${tw`
        flex bg-white
    `}
`

export const AddCardButtonContainer = styled.div`
   ${tw`
        flex items-center py-8px mx-8px bg-white
    `}
`

export const AddCardButton = styled.button`
   ${tw`
        flex items-center border-none mt-4px rounded-4px bg-transparent focus:outline-none cursor-pointer
    `}
`

export const AddCardButtonText = styled(Typo14BlueGreyHKGroteskRegular)`
   ${tw`
        ml-4px
    `}
`

export const EmptyCard = styled.div`
   ${tw`min-h-0.5px`}
`
