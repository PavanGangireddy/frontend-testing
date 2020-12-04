import tw, { styled } from 'twin.macro'

import { DROP_DOWN_CONTENT_CONTAINER_Z_INDEX } from '../../constants/ZIndexConstants'

export const PopoverContainer = styled.div`
   ${tw`outline-none`};
`

export const TriggerContainer = styled.div`
   ${tw`outline-none cursor-pointer`}
`

export const TargetContainer = styled.div`
   z-index: ${DROP_DOWN_CONTENT_CONTAINER_Z_INDEX};
`
