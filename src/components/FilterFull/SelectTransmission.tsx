import { FieldProps } from 'formik'
import Select from 'react-select'

type CustomSelectProps = {
  options: any
  placeholder?: string
}

const SelectTransmission: React.FC<FieldProps & CustomSelectProps> = ({
  field,
  options,
  form,
  placeholder,
}): JSX.Element => {
  return (
    <Select
      className="select"
      placeholder={placeholder}
      options={options}
      name={field.name}
      onChange={(e) => form.setFieldValue(field.name, e.value)}
      value={
        options
          ? options.find((option: any) => option.value === field.value)
          : ''
      }
    />
  )
}

export default SelectTransmission
