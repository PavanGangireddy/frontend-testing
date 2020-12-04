import React, { ReactNode } from 'react'
import { storiesOf } from '@storybook/react'
import tw, { styled } from 'twin.macro'

import { Typo14SteelHKGroteskRegular } from '../../../../Common/styleGuide/Typos'

import WorkBookGridItem from '.'

const listMenuData = ['Add list on right', 'Add list on left', 'Move list']

const ListMenuContainer = styled.div`
   ${tw`min-w-228px p-8px bg-white flex flex-col shadow rounded `}
`

const ListMenuItem = styled(Typo14SteelHKGroteskRegular)`
   ${tw`py-8px px-16px cursor-pointer tracking-normal leading-relaxed
   hover:text-darkBlueGrey hover:bg-lightBlueGrey24	`}
`

const listMenuItems = (): ReactNode => (
   <ListMenuContainer>
      {listMenuData.map(item => (
         <ListMenuItem
            key={item}
            as='div'
            onClick={event => {
               event.stopPropagation()
            }}
         >
            {item}
         </ListMenuItem>
      ))}
   </ListMenuContainer>
)

const onDoubleClickWorkbook = workbookId => {}

storiesOf('WorkbookManagement/common/WorkBookGridItem', module)
   .add('Workbook with pin', () => (
      <WorkBookGridItem
         name={'Drilldown on getting offer letter'}
         id={'0'}
         isPinned={true}
         onDoubleClickWorkbook={onDoubleClickWorkbook}
         currentRoute={'home'}
         onClickWorkbookMenuItem={() => {}}
         isPublishedByUs={false}
      />
   ))

   .add('Workbook without pin', () => (
      <WorkBookGridItem
         name={'project'}
         id={'0'}
         isPinned={false}
         onDoubleClickWorkbook={onDoubleClickWorkbook}
         currentRoute={'home'}
         onClickWorkbookMenuItem={() => {}}
         isPublishedByUs={true}
      />
   ))
