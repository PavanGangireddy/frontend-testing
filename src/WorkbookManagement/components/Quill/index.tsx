import * as React from 'react'
import hljs from 'highlight.js'
import './highlight'
import 'highlight.js/styles/github.css'
import ReactQuill from 'react-quill'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import 'react-quill/dist/quill.snow.css'

import { getRandomNumber } from '../../../Common/utils/NumberUtils'

import './linkHandler'
import './styles.css'

interface Props {
   placeholder: string
   value?: string
   bounds: string
   quillId?: string
   onBlur?: (value: any) => void
}

const CustomToolbar = ({ id = 'toolbar' }: any) => (
   <div id={id}>
      <button className='ql-bold' />
      <button className='ql-italic' />
      <button className='ql-underline' />
      <button className='ql-strike' />
      <button className='ql-code-block' />
      <button className='ql-list' value='ordered' />
      <button className='ql-list' value='bullet' />
      <button className='ql-link' />
      <button className='ql-inlineCodeBlock'>{'` `'}</button>
      <button className='ql-script' value='sub' />
      <button className='ql-script' value='super' />
   </div>
)

@observer
class Quill extends React.Component<Props> {
   quillRef
   quill
   range
   toolbarId

   @observable baseS3Ref
   @observable editorHtml: string

   static defaultProps = {
      value: '',
      bounds: 'document.body',
      quillId: 'reactQuillEditor'
   }

   constructor(props: Props) {
      super(props)
      this.quillRef = React.createRef()
      this.baseS3Ref = React.createRef()
      this.editorHtml = props.value ? props.value : ''
      this.toolbarId = `toolbar${getRandomNumber(0, 100).toString()}`
      hljs.configure({
         languages: ['c', 'html', 'cpp', 'python', 'javascript', 'java']
      })
   }

   componentDidMount() {
      this.quillRef
         .getEditor()
         .on('text-change', (delta, oldContents, source) => {
            for (let i = 0; i < delta.ops.length; i++) {
               //eslint-disable-next-line
               if (delta.ops[i].hasOwnProperty('insert')) {
                  if (delta.ops[i].insert === ' ') {
                     this.onSpace()
                  }
               }
            }
         })
   }

   onSpace = () => {
      this.quill = this.quillRef.getEditor()
      const selection = this.quill.getSelection(true)
      if (!selection) return
      const [line, offset] = this.quill.getLine(selection.index)
      const text = line.domNode.textContent
      const lineStart = selection.index - offset
      selection.length = selection.index++
      const pattern = /(?:`)(.+?)(?:`)/g
      const match = pattern.exec(text)
      if (match) {
         const annotatedText = match[0]
         const matchedText = match[1]
         const startIndex = lineStart + match.index
         this.quill.deleteText(startIndex, annotatedText.length)
         this.quill.insertText(startIndex, matchedText, { code: true })
         this.quill.format('code', false)
      }
   }

   inlineCodeBlock = () => {
      this.quill = this.quillRef.getEditor()
      this.range = this.quill.getSelection(true)
      const rangeEndingIndex = this.range.index + this.range.length
      this.quill.insertText(this.range.index, '`')
      this.quill.insertText(rangeEndingIndex + 1, '`')
      this.quill.setSelection(rangeEndingIndex + 1)
   }

   handleChange = html => {
      this.editorHtml = html
   }

   getEditorData = (): string => this.editorHtml

   setEditorData = (value: string): void => {
      this.handleChange(value)
   }

   getModules = () => ({
      syntax: true,
      toolbar: {
         container: `#${this.toolbarId}`,
         handlers: {
            inlineCodeBlock: this.inlineCodeBlock
         }
      },
      clipboard: { matchVisual: false }
   })

   onFailFileUpload = (): void => {
      this.quill.deleteText(this.range.index, 1)
   }

   onBlur = () => {
      const { onBlur } = this.props
      onBlur && onBlur(this.editorHtml)
   }

   render(): React.ReactNode {
      return (
         <>
            <CustomToolbar id={this.toolbarId} />
            <ReactQuill
               data-testid={this.props.quillId}
               ref={el => (this.quillRef = el)}
               theme={'snow'}
               onChange={this.handleChange}
               value={this.editorHtml}
               modules={this.getModules()}
               placeholder={this.props.placeholder}
               bounds={this.props.bounds}
               onBlur={this.onBlur}
            />
         </>
      )
   }
}

export default Quill
