import tw, { styled } from 'twin.macro'

import { Typo14WhiteHKGroteskSemiBold } from '../../styleGuide/Typos'
import { mobile } from '../../utils/MixinUtils'

export const Container = styled('div')`
   ${tw`flex flex-col justify-center items-center flex-grow`}
`

export const ImageSection = styled('img')`
   ${tw`  max-h-424.5px mb-60.5px ml-65px w-192px md:h-175px md:w-1/5 md:h-205px lg:h-278px xl:h-400px`}
   ${mobile} {
      ${tw`ml-0`}
   }
`

export const HomeButton = styled(Typo14WhiteHKGroteskSemiBold)`
   ${tw`w-128px h-40px rounded-4px bg-brightBlue flex justify-center items-center leading-1.71 no-underline`}
`
export const LogoContainer = styled.div`
   ${tw`flex justify-center`}
`
export const Wrapper = styled.section`
   ${tw`bg-whiteTwo flex flex-col h-screen`}
`
