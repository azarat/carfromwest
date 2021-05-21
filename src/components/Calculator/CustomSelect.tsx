import { FieldProps } from 'formik'
import React from 'react'
import Select from 'react-select'

type CustomSelectProps = {
  options: any
  placeholder?: string
}

const CustomSelect: React.FC<FieldProps & CustomSelectProps> = ({
  field,
  options,
  form,
}) => {
  return (
    <Select
      className="calculator__select-container"
      classNamePrefix="calculator__select"
      options={options}
      name={field.name}
      onChange={(e) => form.setFieldValue(field.name, e?.value)}
      defaultValue={options[0]}
      value={
        options
          ? options.find((option: any) => option.value === field.value)
          : ''
      }
    />
  )
}

export default CustomSelect
