import tw, { styled } from 'twin.macro'

import { Typo30DarkBlueGreyHKGroteskRegular } from '../../../Common/styleGuide/Typos'
import { isTabletDevice } from '../../../Common/utils/responsiveUtils'

export const ActiveFolderFilterBarContainer = styled.div`
   ${tw`flex justify-between items-center pt-24px pl-32px`};
`

export const ActiveProjectDetailsContainer = styled.div`
   ${tw`w-6/12 p-16px md:p-0 flex items-center`}
`

export const ProjectIconContainer = styled.div`
   ${tw`cursor-pointer`}
`

export const ProjectTitle = styled(Typo30DarkBlueGreyHKGroteskRegular)`
   ${tw`ml-16px text-18px md:text-30px truncate`}
`

export const SearchBarWrapper = styled.div`
   ${tw`w-6/12`}
   ${isTabletDevice && tw`w-8/12`}
`
