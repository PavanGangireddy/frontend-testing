import tw, { styled } from 'twin.macro'

import { Typo12BrightBlueHKGroteskRegular } from '../../../Common/styleGuide/Typos'
import Image from '../../../Common/components/Image'

export const MobileAttachmentContainer = styled.div`
   ${tw`
   h-84px w-84px border border-solid border-lightBlueGrey rounded overflow-hidden mx-8px flex-shrink-0
`}
`
export const MobileAttachmentUrl = styled(Typo12BrightBlueHKGroteskRegular)`
   ${tw`
   h-20px w-84px flex justify-center items-center
`}
`
export const MobileImageContainer = styled.div`
   ${tw`
   h-64px w-84px flex overflow-hidden
`}
`
export const AttachmentImage = styled(Image)`
   ${tw`object-cover w-full`}
`
