import React, { useState, useEffect } from 'react'
import { FieldProps } from 'formik'
import Select, { components } from 'react-select'
import ArrowSVG from '../../assets/svg/chevron_down.svg'

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
  
  const hasWindow = typeof window !== 'undefined';

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : 0;
    const height = hasWindow ? window.innerHeight : 0;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);


  const selectStyles = {
    option: (provided: any) => ({
      ...provided
    }),
    control: (provided: any) => ({
      ...provided,
      borderColor: '#E0E0E0',
      borderRadius: '10px',
      minHeight: (windowDimensions.width <= 1920) ? '40px' : '60px'
    }),
    input: (provided: any) => ({
      ...provided,
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontSize: (windowDimensions.width <= 1920) ? '14px' : '20px',
      lineHeight: (windowDimensions.width <= 1920) ? '16px' : '24px',
      fontWeight: '500',
      color: '#333333'
    }),
    singleValue: (provided: any) => ({
      ...provided,
      fontSize: (windowDimensions.width <= 1920) ? '14px' : '20px',
      lineHeight: (windowDimensions.width <= 1920) ? '16px' : '24px',
      fontWeight: '500',
      color: '#0F2442'
    })
  }

  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <ArrowSVG />
      </components.DropdownIndicator>
    );
  };

  return (
    <Select
      className="select"
      placeholder={placeholder}
      components={{ 
        DropdownIndicator,  
        IndicatorSeparator: () => null 
      }}
      options={options}
      name={field.name}
      styles={selectStyles}
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
