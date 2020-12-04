import tw, { styled } from 'twin.macro'

import { Typo14BlueGreyHKGroteskRegular } from '../../../Common/styleGuide/Typos'
import { mobile } from '../../../Common/utils/MixinUtils'

export const ListContainer = styled.div`
   ${tw`
        w-full  border border-solid border-lightBlueGrey
        rounded-8px box-border flex-wrap
    `}
   height: fit-content;
   ${mobile} {
      ${tw`overflow-y-auto`}
      ${({ listContainerMaxHeight }): string =>
         `max-height: ${listContainerMaxHeight}px`}
   }
`

export const DraggableListContainer = styled.div`
   ${tw`
        w-full overflow-hidden
    `}
`

export const SectionsContainer = styled.div`
   ${tw`
        w-full flex flex-col relative bg-white rounded-8px rounded-t-none
    `}
`

export const AddSectionButtonContainer = styled.div`
   ${tw`
        w-full flex items-center p-8px rounded-8px
    `}
`

export const AddSectionButton = styled.button`
   ${tw`
        flex items-center border-none mt-4px rounded-4px bg-transparent focus:outline-none cursor-pointer
    `}
`

export const AddSectionButtonText = styled(Typo14BlueGreyHKGroteskRegular)`
   ${tw`
        ml-4px leading-1.71
    `}
`

export const SectionDroppableArea = styled.div``
