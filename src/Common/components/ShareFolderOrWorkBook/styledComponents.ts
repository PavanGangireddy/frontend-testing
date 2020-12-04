import tw, { styled } from 'twin.macro'

import { Typo12DarkBlueGreyHKGroteskSemiBold } from '../../styleGuide/Typos'

export const SharedFolderContainer = styled.div`
   ${tw``}
`

export const MainContainer = styled('div')`
   ${tw`flex flex-col bg-white shadow-steel16 border-default border-solid border-lightBlueGrey rounded-4px py-25px relative `}
`

export const StyledIconContainer = styled('div')`
   ${tw`flex items-center justify-center w-16px h-16px cursor-pointer absolute top-24px right-24px`}
`

export const Heading = styled(Typo12DarkBlueGreyHKGroteskSemiBold)`
   ${tw`leading-1.33 px-25px uppercase`}
`

export const Divider = styled.div`
   ${tw`w-full h-px mt-20px mb-25px bg-lightBlueGrey`}
`
