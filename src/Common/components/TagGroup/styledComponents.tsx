import tw, { styled } from 'twin.macro'

import PlusIcon from '../../icons/PlusIcon'

import Button from '../Button'

export const TagGroupContainer = styled.div`
   ${tw`w-full flex flex-row flex-wrap`}
`

export const StyledButton = styled(Button)`
   ${tw`mt-10px h-20px w-44px px-16px py-4px`}
`

export const StyledPlusIcon = styled(PlusIcon)`
   ${tw`p-1.5px `}
`
