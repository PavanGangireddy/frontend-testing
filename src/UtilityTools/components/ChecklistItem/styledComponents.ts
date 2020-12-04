import tw, { styled, css } from 'twin.macro'

import CommonButton from '../../../Common/components/Button'
import {
   Typo14BlackHKGroteskRegular,
   Typo14SteelHKGroteskRegular
} from '../../../Common/styleGuide/Typos'

export const ChecklistItemWrapper = styled.div`
   ${tw`mb-16px flex flex-col justify-center w-full relative`}
`

export const ChecklistItemContainer = styled.div`
   ${tw`flex items-center w-full`}
`

export const CheckBoxContainer = styled.div`
   ${tw`flex m-0  cursor-pointer`}
`

export const SaveChecklistItemButton = styled(CommonButton)`
   ${tw`p-2 ml-1 mr-8px`}
`

export const ButtonsContainer = styled.div`
   ${tw`flex items-center  ml-24px mt-8px`}
`

export const editableTextInputStyles = css`
   ${tw`px-2 ml-4px flex flex-1 h-28px min-w-125px max-w-400px`}
`

export const Action = styled.div`
   ${tw`absolute right--10px flex items-center content-center cursor-pointer`}
`

export const ActiveTextStyle = styled(Typo14BlackHKGroteskRegular)``

export const DisableTextStyle = styled(Typo14SteelHKGroteskRegular)``

export const containerCSS = css`
   ${tw`pointer-events-none cursor-not-allowed`}
`
