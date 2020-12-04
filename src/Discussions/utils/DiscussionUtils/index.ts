import { DISCUSSIONS_DATE_TIME_FORMAT } from '../../../Common/constants/DateConstants'
import { getDateFromDateObject } from '../../../Common/utils/DateUtils'

import {
   markUpsForEncodingAndDecoding,
   startAndEndHTMLTagsForMentions
} from '../../constants/DiscussionConstants'

// NOTE: TimeUtils
export const getDateAndTimeInDiscussionsFormat = (date: Date) =>
   getDateFromDateObject(date, DISCUSSIONS_DATE_TIME_FORMAT)

// NOTE: Encoding and Decoding Utils

export const descriptionFormatDecoder = (description: string) => {
   const {
      prefixMarkupForDescription,
      suffixMarkupForDescription
   } = markUpsForEncodingAndDecoding
   const dummyDescription = description
   return dummyDescription
      .split(prefixMarkupForDescription)
      .join('')
      .split(suffixMarkupForDescription)
      .join('')
}

export const replyFormatEncoder = (description: string) => {
   const {
         prefixMarkupForDescription,
         suffixMarkupForDescription
      } = markUpsForEncodingAndDecoding,
      { startHTMLTag, endHTMLTag } = startAndEndHTMLTagsForMentions

   const namesList = description
      .split(prefixMarkupForDescription)
      .filter(data => data.includes(suffixMarkupForDescription))
      .map(name => name.split(suffixMarkupForDescription)[0])

   let outputString = description
   const mentionedUsersIdList: string[] = []

   namesList.forEach(anchorTaggedName => {
      outputString = outputString
         .split(anchorTaggedName)
         .join(startHTMLTag + endHTMLTag)
   })
   return {
      modifiedDescription: outputString,
      modifiedMentionedUsersAsList: mentionedUsersIdList
   }
}

export const modifyDescriptionForTriggeringMentionMarkups = (
   description: string
) => {
   const {
      prefixMarkupForDescription,
      suffixMarkupForDescription
   } = markUpsForEncodingAndDecoding
   const { startHTMLTag, endHTMLTag } = startAndEndHTMLTagsForMentions
   return description
      .split(startHTMLTag)
      .join(` ${prefixMarkupForDescription}${startHTMLTag} `)
      .split(endHTMLTag)
      .join(` ${endHTMLTag}${suffixMarkupForDescription} `)
}
