import tw, { css, styled } from 'twin.macro'
import { Typo18DarkSlateBlueHKGroteskSemiBold } from '../../../Common/styleGuide/Typos'

import { mobile } from '../../../Common/utils/MixinUtils'

export const loaderContainerClassName = css`
   ${tw`bg-whiteTwo flex items-start flex-wrap justify-start flex-grow-0 ml-16px mb-16px`};
   height: fit-content;
   ${mobile} {
      ${tw` ml-24px mt-8px`}
   }
`

export const StarredFoldersAndFilesContainer = styled.div`
   ${tw`
      mb-48px md:p-32px py-0 md:py-0
   `}
`

export const StarredFoldersAndFilesHeader = styled.div`
   ${tw`
      my-16px md:mt-0
   `}
`

export const StarredFolderAndFilesLabelText = styled(
   Typo18DarkSlateBlueHKGroteskSemiBold
)`
   ${tw`
      text-16px md:text-18px
   `}
`

export const StarredFoldersAndFiles = styled.div`
   ${tw`flex flex-wrap md:-mt-16px lg:-mt-32px`}
   ${mobile} {
      ${tw`items-stretch`}
   }
`
