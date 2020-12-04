import tw, { styled, css } from 'twin.macro'

import {
   Typo36DarkBlueGreyHKGroteskRegular,
   Typo30DarkBlueGreyDMSerifDisplayRegular
} from '../../../Common/styleGuide/Typos'
import {
   mobile,
   maxDeviceWidth,
   customDevice,
   tablet
} from '../../../Common/utils/MixinUtils'
import Image from '../../../Common/components/Image'
import colors from '../../../Common/themes/Colors'

export const LearningsWrapper = styled.div`
   ${tw`pt-24px pr-40px pb-16px pl-16px md:pl-32px`}
   background-image: ${props =>
      props.isEmptyPage
         ? `url(
              'https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/32cfbbe1-9766-4be3-9bb2-acba2a721779.svg'
           )`
         : `linear-gradient(
         to bottom,
         ${colors.whiteTwo},
         rgba(251, 251, 251, 0.5)
      ),
      url('https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/32cfbbe1-9766-4be3-9bb2-acba2a721779.svg')`};
   background-repeat: no-repeat;
   background-position-x: center;
   background-position-y: bottom;
   min-height: calc(100vh - 10px);
   position: relative;
   background-size: 56%;
   ${maxDeviceWidth(426)} {
      background-size: 90%;
   }
   ${customDevice(427, 900)} {
      background-size: 80%;
   }
   ${mobile} {
      ${tw`p-16px`}
      max-height:calc(100vh - 60px);
   }
`

export const Title = styled(Typo30DarkBlueGreyDMSerifDisplayRegular)`
   ${tw` mr-8px leading-1.27 tracking-0.12px mb-8px md:text-30px`}
`

export const Workbooks = styled.div`
   ${tw`flex flex-wrap justify-start mt-12px md:mt-0`};
`

export const Container = styled.div`
   ${tw``}
`

export const SubContainer = styled.div`
   ${tw`flex border-0 border-solid border-b border-lightBlueGrey`}
   ${mobile} {
      ${tw`mx-8px`}
   }
`

export const containerClassName = css`
   ${tw`bg-whiteTwo flex flex-col items-start flex-wrap justify-start flex-grow-0 pl-32px pt-24px`};
   ${mobile} {
      ${tw` pl-24px pt-8px`}
   }

   background-image: linear-gradient(
         to bottom,
         ${colors.whiteTwo},
         rgba(251, 251, 251, 0.5)
      ),
      url('https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/32cfbbe1-9766-4be3-9bb2-acba2a721779.svg');
   background-repeat: no-repeat;
   background-position-x: center;
   background-position-y: bottom;

   background-size: 56%;
   ${maxDeviceWidth(426)} {
      background-size: 90%;
   }
   ${customDevice(427, 900)} {
      background-size: 80%;
   }
`

export const LearningsNoDataViewContainer = styled.div`
   ${tw`w-full flex items-end`}
`

export const NodataContainer = styled.div`
   ${tw` w-full flex flex-col`}
`

export const NoDataHeading = styled(Typo36DarkBlueGreyHKGroteskRegular)`
   margin-top: 22vh;
   ${mobile} {
      ${tw`text-24px`}
   }
   ${tablet} {
      margin-top: 120px;
   }
`

export const NoDataImage = styled(Image)`
   max-width: 673px;
   ${tw`w-full h-auto self-center`};
   ${mobile} {
      max-width: 336px;
   }
`
