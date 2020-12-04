import React, { ReactElement } from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'

import Colors from '../../themes/Colors'
import {
   Typo14SteelHKGroteskRegular,
   Typo18DarkBlueGreyHKGroteskMedium,
   Typo12SteelHKGroteskRegular,
   Typo14SteelHKGroteskBold,
   Typo12WhiteHKGroteskRegular
} from '../../styleGuide/Typos'
import DeleteIcon from '../../icons/DeleteIcon'
import ReactSelectDropDownArrow from '../../icons/ReactSelectDropDownArrow'

import Image from '../Image'

import PopoverMenu from '.'

/**Types */
interface Member {
   id: string
   name: string
   profileName: string
   profilePic: string
}
interface MemberWithPopoverDescriptionProps {
   member: Member
}

interface MemberWithOutDescriptionProps {
   profilePic: string
   name: string
}

interface MemberDescriptionProps {
   name: string
   profileName: string
   profilePic: string
}

/**Types - End */

/** Styled Components*/

const StoryBookContainer = styled.div`
   width: 300px;
   margin: auto;
   display: flex;
   justify-content: center;
   padding-top: 20px;
`

const CardPopoverMenuContainer = styled.div`
   width: 205px;
   padding: 12px;
   box-shadow: 0 4px 40px 0 ${Colors.darkBlueGrey16};
   background-color: ${Colors.white};
   border-radius: 2px;
   display: flex;
   flex-direction: column;
`

const MenuItemContainer = styled.div`
   padding: 8px 8px 8px 4px;
   display: flex;
   flex-direction: column;
`

const MenuItemHeading = styled(Typo14SteelHKGroteskBold)`
   padding-bottom: 8px;
   line-height: 1.71;
   letter-spacing: normal;
   text-transform: uppercase;
`

const LabelsContainer = styled.div`
   display: flex;
   align-items: flex-end;
`
const ColoredLabelsContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   width: 80%;
`

interface ColoredLabelProps {
   borderColor: string
   backgroundColor: string
}

const ColoredLabel = styled.div<ColoredLabelProps>`
   width: 24px;
   height: 18px;
   border-radius: 2px;
   border: solid 1px ${props => props.borderColor};
   background-color: ${props => props.backgroundColor};
   margin-right: 4px;
   margin-bottom: 4px;
   display: flex;
   justify-content: flex-end;
`

const ArrowContainer = styled.div`
   display: flex;
   align-items: center;
   padding-left: 2px;
   transform: rotate(180deg);
`

const PlainLabel = styled.div`
   width: 24px;
   height: 18px;
   border-radius: 2px;
   border: solid 1px ${Colors.steel};
   background-color: ${Colors.white};
   margin-bottom: 4px;
`

const PriorityLabelsContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
`

const PriorityLabel = styled(Typo12WhiteHKGroteskRegular)`
   width: 16px;
   height: 16px;
   border-radius: 50%;
   background-color: ${Colors.darkBlueGrey};
   margin-right: 6px;
   margin-bottom: 0;
   margin-top: 0;
   display: flex;
   justify-content: center;
`

const Divider = styled.div`
   width: 100%;
   height: 2px;
   border-radius: 2px;
   background-color: ${Colors.steel};
   opacity: 0.5;
`

const MembersListContainer = styled.div`
   display: flex;
`

const MemberDescriptionContainer = styled.div`
   min-width: 227px;
   padding: 16px;
   border: solid 1px ${Colors.lightBlueGrey};
   background-color: ${Colors.white};
   border-radius: 4px;
   display: flex;
`
const DescriptionBoxDp = styled(Image)`
   width: 45px;
   object-fit: contain;
   border-radius: 50%;
   margin-right: 12px;
`

const NameContainer = styled.div`
   display: flex;
   flex-direction: column;
   flex: 1;
`

const MemberName = styled(Typo18DarkBlueGreyHKGroteskMedium)`
   line-height: 1.33;
   letter-spacing: normal;
   margin-bottom: 2px;
`

const MemberProfileName = styled(Typo12SteelHKGroteskRegular)`
   line-height: 1.33;
   letter-spacing: normal;
`

const MemberPic = styled(Image)`
   height: 32px;
   object-fit: contain;
   margin-right: 8px;
`

const IconContainer = styled.div`
   cursor: pointer;
`

const ListMenuContainer = styled.div`
   min-width: 228px;
   padding: 8px;
   box-shadow: 0 4px 40px 0 ${Colors.darkGreyBlueTwoSixteen};
   background-color: ${Colors.white};
   border-radius: 4px;
   display: flex;
   flex-direction: column;
`

const ListMenuItem = styled(Typo14SteelHKGroteskRegular)`
   line-height: 1.71;
   letter-spacing: normal;
   padding: 8px 16px;
   cursor: pointer;
   &:hover {
      color: ${Colors.darkBlueGrey};
      background-color: ${Colors.lightBlueGrey24};
   }
`

/** Styled Components*/

/**Data */

const labelColors = [
   { borderColor: '#2ec2d6', bgColor: '#8adeea' },
   { borderColor: '#72add9', bgColor: '#abd1ec' },
   { borderColor: '#8d72bb', bgColor: '#beabde' },
   { borderColor: '#50dd9d', bgColor: '#9cedc7' },
   { borderColor: '#c5bd00', bgColor: 'rgba(255, 251, 171, 0.6)' },
   { borderColor: '#ffb32e', bgColor: '#ffd58a' },
   { borderColor: '#6587dd', bgColor: '#c8d5f5' },
   { borderColor: '#d38299', bgColor: '#edc8d3' },
   { borderColor: '#c172d4', bgColor: '#deabea' },
   { borderColor: '#966149', bgColor: '#c8a999' }
]
const priorityList = [1, 2, 3, 4, 5, 6]
const membersData = [
   {
      id: '1',
      name: 'Neeraja',
      profileName: '@Neeraja',
      profilePic:
         'https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/b3e080d0-436c-4b07-9c4a-89290ff69feb.svg'
   },
   {
      id: '2',
      name: 'Praneetha',
      profileName: '@Praneetha',
      profilePic:
         'https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/10cf57e7-64d9-4727-b8d3-da31af26905d.svg'
   }
]
const listMenuData = ['Add list on right', 'Add list on left', 'Move list']

/**Data */

/**Components Start */

/** CardPopoverMenu */

function renderCardPopoverMenu(): ReactElement {
   return (
      <CardPopoverMenuContainer>
         <MenuItemContainer>
            <MenuItemHeading>Label</MenuItemHeading>
            <LabelsContainer>
               <ColoredLabelsContainer>
                  {labelColors.map(item => (
                     <ColoredLabel
                        borderColor={item.borderColor}
                        backgroundColor={item.bgColor}
                        key={item.bgColor}
                     >
                        <ArrowContainer>
                           <ReactSelectDropDownArrow
                              fill={Colors.darkBlueGrey}
                              width={10}
                              height={10}
                           />
                        </ArrowContainer>
                     </ColoredLabel>
                  ))}
               </ColoredLabelsContainer>
               <PlainLabel />
            </LabelsContainer>
         </MenuItemContainer>
         <Divider />
         <MenuItemContainer>
            <MenuItemHeading>Priority</MenuItemHeading>
            <PriorityLabelsContainer>
               {priorityList.map(item => (
                  <PriorityLabel as='p' key={item}>
                     {item}
                  </PriorityLabel>
               ))}
            </PriorityLabelsContainer>
         </MenuItemContainer>
         <Divider />
         <MenuItemContainer>
            <MenuItemHeading>More</MenuItemHeading>
         </MenuItemContainer>
      </CardPopoverMenuContainer>
   )
}

function CardPopoverMenu(): ReactElement {
   return (
      <PopoverMenu
         renderPopoverContent={renderCardPopoverMenu()}
         placement='bottomRight'
      />
   )
}

/** MembersListWithPopoverDescription */

function renderDescriptionBox(props: MemberDescriptionProps): ReactElement {
   const { profilePic, name, profileName } = props
   return (
      <MemberDescriptionContainer>
         <DescriptionBoxDp src={profilePic} alt={name} />
         <NameContainer>
            <MemberName>{name}</MemberName>
            <MemberProfileName>{profileName}</MemberProfileName>
         </NameContainer>
         <IconContainer>
            <DeleteIcon />
         </IconContainer>
      </MemberDescriptionContainer>
   )
}

function renderMember(props: MemberWithOutDescriptionProps): ReactElement {
   const { profilePic, name } = props
   return <MemberPic src={profilePic} alt={name} />
}

function MemberWithPopoverDescription(
   props: MemberWithPopoverDescriptionProps
): ReactElement {
   const { name, profilePic, profileName } = props.member
   return (
      <PopoverMenu
         renderPopoverTrigger={renderMember({ profilePic, name })}
         renderPopoverContent={renderDescriptionBox({
            name,
            profilePic,
            profileName
         })}
         placement='bottomLeft'
         on='hover'
      />
   )
}

function MembersListWithPopoverDescription(): ReactElement {
   return (
      <MembersListContainer>
         {membersData.map(member => (
            <MemberWithPopoverDescription member={member} key={member.id} />
         ))}
      </MembersListContainer>
   )
}

/**List menu Component */

function listMenuItems(): ReactElement {
   return (
      <ListMenuContainer>
         {listMenuData.map(item => (
            <ListMenuItem
               key={item}
               as='div'
               onClick={event => {
                  event.stopPropagation()
                  console.log(item)
               }}
            >
               {item}
            </ListMenuItem>
         ))}
      </ListMenuContainer>
   )
}

/**Simple Example */
function popoverMenuContent(): ReactElement {
   return <span style={{ color: 'black' }}>Popover Content</span>
}

/**Components End */

storiesOf('Overlays/PopoverMenu', module)
   .add('Simple Example', () => (
      <StoryBookContainer>
         <PopoverMenu renderPopoverContent={popoverMenuContent()} />
      </StoryBookContainer>
   ))
   .add('List Menu Items', () => (
      <StoryBookContainer>
         <PopoverMenu renderPopoverContent={listMenuItems()} />
      </StoryBookContainer>
   ))
   .add('List of Members with Description as popover item', () => (
      <StoryBookContainer>
         <MembersListWithPopoverDescription />
      </StoryBookContainer>
   ))
   .add('Card popover menu item', () => (
      <StoryBookContainer>
         <CardPopoverMenu />
      </StoryBookContainer>
   ))
