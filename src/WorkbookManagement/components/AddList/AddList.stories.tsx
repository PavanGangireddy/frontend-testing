import React from 'react'
import { storiesOf } from '@storybook/react'
import { styled } from 'twin.macro'

import AddList from '.'

const Div = styled.div``

storiesOf('WorkbookManagement/Workbook/AddList', module).add(
   'Default View',
   () => (
      <Div>
         <AddList
            listContainerRef={React.createRef<HTMLDivElement>()}
            pageId={'1'}
            listId={'1'}
            order={1}
            listName={''}
            onChangeListName={(): void => {}}
            onClickAddListButton={(): void => {}}
            onClickCancelButton={(): void => {}}
            createListAPIError={undefined}
            createListAPIStatus={200}
            getPageDetails={(): void => {}}
         />
      </Div>
   )
)
