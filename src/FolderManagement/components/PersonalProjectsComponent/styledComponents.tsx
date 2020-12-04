import tw, { styled } from 'twin.macro'

import {
   mobile,
   minDeviceWidth,
   customDevice,
   tablet
} from '../../../Common/utils/MixinUtils'

export const PersonalProjectsContainer = styled.div`
   ${tw`
   w-full h-screen flex flex-col md:flex-row xl:justify-between p-56px box-border overflow-y-auto flex-grow
    `};
   background-image: url('https://res.cloudinary.com/due4dmz2b/image/fetch/dpr_auto,w_auto,f_auto,q_auto/https://bss-backend-media-static.s3.ap-south-1.amazonaws.com/front-end/media/workbook-desktop-background.png');
   background-size: cover;
   ${mobile} {
      ${tw`py-24px px-28px`}
      background-image: url('https://res.cloudinary.com/due4dmz2b/image/fetch/dpr_auto,w_auto,f_auto,q_auto/https://bss-backend-media-static.s3.ap-south-1.amazonaws.com/front-end/media/workbook-mobile-background.png');
      background-position-x: center;
      height: auto;
   }
   ${customDevice(768, 935)} {
      ${tw`flex-col`}
   }
   ${minDeviceWidth(1200)} {
      background-position-y: 85%;
   }
   ${customDevice(900, 1024)} {
      background-position-y: 55%;
   }
   ${tablet} {
      background-position-x: center;
   }
`
