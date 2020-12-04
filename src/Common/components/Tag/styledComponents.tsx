import tw, { styled } from 'twin.macro'

import CloseIcon from '../../icons/CloseIcon'
import { Typo12BrightBlueHKGroteskRegular } from '../../styleGuide/Typos'

export const TagContainer = styled.div`
   ${tw`h-24px w-84px rounded-100px px-8px py-4px flex flex-row items-center box-border bg-brightBlue10 justify-between cursor-pointer mr-8px mt-8px`}
`

export const TagText = styled(Typo12BrightBlueHKGroteskRegular)`
   ${tw`leading-1.33 truncate`}
`
export const StyledCloseIcon = styled(CloseIcon)`
   ${tw`p-3.2px flex-shrink-0`}
`
