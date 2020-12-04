import { ReactElement } from 'react'
import { Placement } from '@accessible/popover'

type On = 'hover' | 'click' | 'focus'

export interface PopoverMenuProps {
   id?: string
   placement: Placement
   on: On
   renderPopoverContent: ReactElement
   renderPopoverTrigger: ReactElement
   triggerTestId?: string
   targetTestId?: string
   openStyle?: any
}
