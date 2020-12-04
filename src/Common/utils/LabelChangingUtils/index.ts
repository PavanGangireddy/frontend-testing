interface DataProps {
   label: string
   value: string
}
interface LabelObjectProps {
   condition: boolean
   label1: string
   value1: string
   label2: string
   value2: string
   data: DataProps | undefined
}
export const getRelatedLabel = (labelObject: LabelObjectProps) => {
   const { condition, label1, value1, label2, value2, data } = labelObject
   if (data) {
      if (condition) {
         data.label = label1
         data.value = value1
      } else {
         data.label = label2
         data.value = value2
      }
   }
}
