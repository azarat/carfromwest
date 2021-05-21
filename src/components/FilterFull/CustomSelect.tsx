import { FieldProps } from 'formik'
import { Dispatch, SetStateAction } from 'react'
import Select from 'react-select'

type CustomSelectProps = {
  options: any
  placeholder?: string
  setYear: Dispatch<SetStateAction<number>>
}

const CustomSelect: React.FC<FieldProps & CustomSelectProps> = ({
  field,
  options,
  form,
  placeholder,
  setYear,
}): JSX.Element => {
  const handleYear = (e: any) => {
    form.setFieldValue(field.name, e.value)
    setYear(e.value)
  }

  return (
    <Select
      className="select"
      placeholder={placeholder}
      options={options}
      name={field.name}
      value={
        options
          ? options.find((option: any) => option.value === field.value)
          : ''
      }
      onChange={(e) => handleYear(e)}
    />
  )
}

export default CustomSelect
