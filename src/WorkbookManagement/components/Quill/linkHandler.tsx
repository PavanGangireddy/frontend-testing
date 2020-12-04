import { Quill } from 'react-quill'

const Link = Quill.import('formats/link')
const builtInFunc = Link.sanitize

Link.sanitize = function customSanitizeLinkInput(linkValueInput) {
   let value = linkValueInput

   if (/^\w+:/.test(value)) {
      // do nothing, since this implies user's already using a custom protocol
   } else if (!/^https?:/.test(value)) {
      value = `http://${value}`
   }

   return builtInFunc.call(this, value) // retain the built-in logic
}
