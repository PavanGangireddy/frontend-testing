import { CORRECT_CARD, WRONGLY_ANSWERED_CARD } from '../constants/UIConstants'

// TODO: Need to update for responsiveness
function getTextWidth(
   content: string,
   hasNotes,
   hasAttachments,
   hasPriority,
   cardStyleType: string,
   maxContentWidth
): number {
   const div = document.createElement('div')
   document.body.appendChild(div)

   const span = document.createElement('span')
   span.style.fontFamily = 'HKGrotesk'
   span.style.fontSize = '16px'
   span.style.textOverflow = 'ellipsis'
   span.style.whiteSpace = 'nowrap'
   span.innerHTML = content

   div.style.height = 'auto'
   div.style.width = 'auto'
   div.style.position = 'absolute'
   div.style.whiteSpace = 'nowrap'
   div.style.padding = '8px'
   div.style.borderWidth = '1px'
   div.style.borderStyle = 'solid'
   div.style.borderColor = 'black'
   div.style.borderRadius = '4px'
   div.style.display = 'flex'
   div.appendChild(span)

   const width = Math.ceil(div.offsetWidth)
   let updatedWidthWithMarginAndBorder = width + 8
   document.body.removeChild(div)

   if (hasNotes) {
      updatedWidthWithMarginAndBorder = updatedWidthWithMarginAndBorder + 24
   }

   if (hasAttachments) {
      updatedWidthWithMarginAndBorder = updatedWidthWithMarginAndBorder + 20
      if (!hasNotes) {
         updatedWidthWithMarginAndBorder = updatedWidthWithMarginAndBorder + 8
      }
   }

   if (hasPriority) {
      updatedWidthWithMarginAndBorder = updatedWidthWithMarginAndBorder + 20
      if (!hasNotes && !hasAttachments) {
         updatedWidthWithMarginAndBorder = updatedWidthWithMarginAndBorder + 8
      }
   }

   if (cardStyleType === WRONGLY_ANSWERED_CARD) {
      updatedWidthWithMarginAndBorder = updatedWidthWithMarginAndBorder + 8
   } else if (cardStyleType === CORRECT_CARD) {
      updatedWidthWithMarginAndBorder = updatedWidthWithMarginAndBorder + 4
   }

   if (updatedWidthWithMarginAndBorder > maxContentWidth) {
      updatedWidthWithMarginAndBorder = maxContentWidth
   }

   return updatedWidthWithMarginAndBorder
}

export function chunkArray(array: Array<any>, maxContentWidth): Array<any> {
   let index = 0
   const arrayLength = array.length
   const tempArray: Array<any> = []
   let currentLength = 0
   let startIndex = 0
   let endIndex = array.length - 1
   for (index = 0; index < arrayLength; index += 1) {
      const maxContentWidthAfterRemoveCheckboxSpace = maxContentWidth - 18
      const hasPriority = array[index].priority !== null
      currentLength =
         currentLength +
         getTextWidth(
            array[index].name,
            array[index].hasNotes,
            array[index].hasAttachments,
            hasPriority,
            array[index].cardStyleType,
            maxContentWidthAfterRemoveCheckboxSpace
         )
      if (currentLength > maxContentWidthAfterRemoveCheckboxSpace) {
         endIndex = index
         tempArray.push(array.slice(startIndex, endIndex))
         startIndex = endIndex
         currentLength = 0
         index = index - 1
      }
      if (index === arrayLength - 1) {
         tempArray.push(array.slice(startIndex, arrayLength))
      }
   }

   return tempArray
}
