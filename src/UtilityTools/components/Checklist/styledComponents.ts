import tw, { styled } from 'twin.macro'

import {
   Typo14BrightBlueHKGroteskRegular,
   Typo18BlueThreeHKGroteskRegular
} from '../../../Common/styleGuide/Typos'

export const ChecklistWrapper = styled.div`
   ${tw`w-full  flex flex-wrap mt-4`}
`

export const ChecklistContainer = styled.div`
   ${tw` flex flex-col  items-start `}
`
export const AddChecklistContainer = styled.div`
   ${tw`flex items-center content-center cursor-pointer flex-1`}
`
export const AddButtonCaption = styled(Typo14BrightBlueHKGroteskRegular)`
   ${tw`ml-3px mt-2px`}
`
export const NoChecklistItemsContainer = styled.div`
   ${tw`w-full flex-wrap flex mt-2 justify-center `}
`

export const NoChecklistItemsCaption = styled(Typo18BlueThreeHKGroteskRegular)`
   ${tw`text-18px w-full  text-center mb-8px`}
`
