import tw, { styled } from 'twin.macro'

import {
   Typo16WhiteHKGroteskRegular,
   Typo12WhiteHKGroteskSemiBold
} from '../../../Common/styleGuide/Typos'
import { isTabletDevice } from '../../../Common/utils/responsiveUtils'

export const AchievementsInfoCardWrapper = styled.div`
   ${tw`w-full px-24px mt-16px`}
   ${isTabletDevice && tw`mt-8px`}
`

export const AchievementsInfoCardContainer = styled.div`
   ${tw`
       flex flex-col rounded-16px  px-16px py-12px w-full bg-duskyBlue60
    `}
`

export const AchievementsInfoTitle = styled(Typo16WhiteHKGroteskRegular)`
   ${tw`
        leading-1.33
    `}
`

export const AchievementInfoContainer = styled.div`
   ${tw`
        w-full  mt-16px flex flex-col
    `}
`

export const AchievementItem = styled.div`
   ${tw`w-full flex justify-between my-4px`}
`

export const AchievementInfo = styled(Typo12WhiteHKGroteskSemiBold)``
