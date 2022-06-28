/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FieldProps } from 'formik'
import { useState } from 'react'
import Link from 'next/link'
import Select from 'react-select'
import Arrow from '../../assets/svg/chevron_down.svg'

type CustomSelectProps = {
  options: any
  filter?: string
  placeholder?: string
  setter: (e: any) => void
  model?: false | undefined
  onChange: (e: any) => void
  transport: string
}

export type TCustomSelectItem = {
  label: string
  value: string
}

const SelectMake: React.FC<FieldProps & CustomSelectProps> = ({
  field,
  filter,
  transport,
  options,
  form,
  placeholder,
  setter,
  model,
  onChange,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const handleChange = (e: any) => {
    form.setFieldValue(field.name, e.value)
    setter(e.value)
    if (onChange !== undefined) {
      onChange(e.value)
    }
  }

  const selectStyles = {
    option: (provided: any) => ({
      ...provided
    }),
    control: (provided: any) => ({
      ...provided,
      borderColor: '#E0E0E0',
      borderRadius: '10px',
      minHeight: '60px'
    }),
    input: (provided: any) => ({
      ...provided,
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontSize: '20px',
      lineHeight: (typeof window !== "undefined" && window.innerWidth <= 1920) ? '16px' : '24px',
      fontWeight: '500',
      color: '#333333'
    }),
    singleValue: (provided: any) => ({
      ...provided,
      fontSize: '20px',
      lineHeight: (typeof window !== "undefined" && window.innerWidth <= 1920) ? '16px' : '24px',
      fontWeight: '500',
      color: '#0F2442'
    })
  }

  const toggling = () => setIsOpen(!isOpen)

  const onOptionClicked = (value: any) => () => {
    setIsOpen(false)
    handleChange(value)
  }


  if (model) {
    return (
      <Select
        className="select"
        placeholder={placeholder}
        options={options}
        name={field.name}
        onChange={handleChange}
        styles={selectStyles}
        value={
          options
            ? options.find((option: any) => option.value === field.value)
            : ''
        }
      />
    )
  }

  const mainClasses = "customDropDown__list-container" + (isOpen ? " customDropDown__list-open" : "")

  return (
    <div className="customDropDown">
      <div
        className="customDropDown__header"
        onClick={toggling}
      >
        {field.value || placeholder}
        <Arrow className="customDropDown__header-arrow" />
      </div>
      <div className={mainClasses}>
        <ul className="customDropDown__list">
          {
            options && options.length !== 0 ? options.map((item: TCustomSelectItem) => (
              <li
                onClick={onOptionClicked(item)}
                className="customDropDown__list-item"
                key={item.label}
              >
                {filter &&
                  (<Link href={`/catalog/transport-is-${transport}/${filter}-is-${item.label}`}>
                    <a style={{ display: 'none' }}>{item.label}</a>
                  </Link>)}
                {item.label}
              </li>
            )) : (
              <li className="customDropDown__list-item">
                Нет элементов
              </li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default SelectMake