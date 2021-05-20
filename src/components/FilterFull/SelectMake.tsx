import { FieldProps } from 'formik'
import Select from 'react-select'

type CustomSelectProps = {
  options: any
  placeholder?: string
  setter: (e: any) => void
}

const SelectMake: React.FC<FieldProps & CustomSelectProps> = ({
  field,
  options,
  form,
  placeholder,
  setter,
}): JSX.Element => {
  const handleChange = (e: any) => {
    form.setFieldValue(field.name, e.value)
    setter(e.value)
  }

  return (
    <Select
      className="select"
      placeholder={placeholder}
      options={options}
      name={field.name}
      onChange={handleChange}
      value={
        options
          ? options.find((option: any) => option.value === field.value)
          : ''
      }
    />
  )
}

export default SelectMake
