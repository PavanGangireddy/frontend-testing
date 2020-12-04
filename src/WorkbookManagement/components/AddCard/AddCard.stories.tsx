import React from 'react'
import { storiesOf } from '@storybook/react'

import SectionModel from '../../stores/models/SectionModel'
import SectionService from '../../services/SectionService/index.fixture'
import CardService from '../../services/CardService/index.fixture'

import AddCard from '.'

//TODO: use fixture data

const cards = [
   {
      card_id: '123456',
      card_title: 'cardName',
      has_attachments: true,
      has_notes: true,
      priority: 1,
      label: '#ffffff'
   }
]

const sectionDetails = {
   section_id: '1234',
   section_name: 'rgukt',
   cards: cards
}

const sectionService = new SectionService()
const cardService = new CardService()
const sectionModel = new SectionModel(
   sectionDetails,
   sectionService,
   cardService
)
storiesOf('Components/AddCard', module).add('AddCard Component', () => (
   <AddCard
      SectionModel={sectionModel}
      onCloseAddCard={() => alert('card closed')}
      onClickMore={() => alert('opens card details')}
   />
))
