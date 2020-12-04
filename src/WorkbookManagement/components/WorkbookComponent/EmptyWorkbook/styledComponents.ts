import tw, { styled } from 'twin.macro'

import { Typo14BlackHKGroteskRegular } from '../../../../Common/styleGuide/Typos'

export const EmptyWorkbookContainer = styled.div`
   ${tw`
        w-full h-full flex items-center justify-center
    `}
`

export const AddPageButton = styled.button`
   ${tw`
        flex items-center p-8px focus:outline-none border border-solid rounded-4px border-lightBlueGrey
    `}
`

export const ButtonText = styled(Typo14BlackHKGroteskRegular)`
   ${tw`
        ml-8px
    `}
`
