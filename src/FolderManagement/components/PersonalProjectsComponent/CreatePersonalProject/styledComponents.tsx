import tw, { styled } from 'twin.macro'

import { Typo14WhiteHKGroteskSemiBold } from '../../../../Common/styleGuide/Typos'
import Button from '../../../../Common/components/Button'
import { customDevice } from '../../../../Common/utils/MixinUtils'

export const CreatePersonalProjectContainer = styled.div`
   ${tw`flex flex-col bg-white items-center  justify-center rounded-16px w-full md:w-256px h-200px 
   xl:mr-136px border border-dashed border-silver mt-24px md:mt-0`}
   ${customDevice(768, 935)} {
      ${tw`mt-24px`}
   }
   ${customDevice(936, 1200)} {
      ${tw`ml-30px`}
   }
`

export const CreateProjectButton = styled(Button)`
   ${tw`flex items-center justify-center p-8px rounded-8px bg-brightBlue mt-16px`}
`

export const CreateProjectText = styled(Typo14WhiteHKGroteskSemiBold)`
   ${tw`ml-8px`}
`
