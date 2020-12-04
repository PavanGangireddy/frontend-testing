import tw, { styled } from 'twin.macro'

import Button from '../Button'

export const CustomSizeButton = styled(Button)`
   ${tw`p-8px fixed bottom-24px right-24px h-48px w-48px flex justify-center items-center`}
   ${props => props.css}
`
export const CustomTextContainer = styled.div`
   ${tw`flex`}
`
