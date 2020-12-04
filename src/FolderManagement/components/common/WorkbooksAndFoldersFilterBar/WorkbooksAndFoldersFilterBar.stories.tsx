import React from 'react'
import tw, { styled } from 'twin.macro'
import { storiesOf } from '@storybook/react'

import WorkbooksAndFoldersFilterBar from '.'

const FilterBarContainer = styled.div`
   ${tw`
      px-24px py-8px
   `}
`

const pathInfo = [
   {
      id: '0',
      name: 'all',
      type: 'NORMAL'
   }
]

const onDoubleClickFolder = (folderId: string): void => {}

storiesOf('WorkbookManagement/Common', module).add(
   'Workbooks and Folders Filter Bar',
   () => (
      <FilterBarContainer>
         <WorkbooksAndFoldersFilterBar
            pathInfo={pathInfo}
            itemsView={'GRID'}
            orderBy={{ label: 'A to Z', value: 'ASC' }}
            orderOptions={[
               { label: 'A to Z', value: 'ASC' },
               { label: 'Z to A', value: 'DESC' }
            ]}
            onClickGridViewButton={Function}
            onClickListViewButton={Function}
            onChangeOrder={Function}
            onDoubleClickFolder={onDoubleClickFolder}
            isSharedWithMe={true}
            currentRoute={'trash'}
         />
      </FilterBarContainer>
   )
)
