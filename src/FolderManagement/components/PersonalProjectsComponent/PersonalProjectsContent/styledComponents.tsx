import tw, { styled } from 'twin.macro'

import {
   Typo48DarkBlueGreyHKGroteskBold,
   Typo14DarkBlueGreyHKGroteskRegular
} from '../../../../Common/styleGuide/Typos'

export const TitleContainer = styled.div`
   ${tw`
      flex items-center
      `}
`

export const PersonalProjectsContentContainer = styled.div`
   ${tw`flex flex-col `}
`

export const PersonalProjectsTitle = styled(Typo48DarkBlueGreyHKGroteskBold)`
   ${tw`text-24px md:text-48px mr-24px md:mr-0`}
`

export const PersonalProjectInfo = styled(Typo14DarkBlueGreyHKGroteskRegular)`
   ${tw`text-14px md:text-18px leading-1.71`}
`

export const SubContentDivision = styled.div`
   ${tw`flex flex-col md:ml-18px`}
`

export const ContentDivision = styled.div`
   ${tw`flex mt-16px  justify-center `}
`
