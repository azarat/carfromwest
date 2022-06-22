import { useState } from 'react'

type AccordionProps = {
  title: string
  isOpenInner?: boolean
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  isOpenInner,
  children,
}): JSX.Element => {
  const [isOpen, setOpen] = useState(!!isOpenInner)
  console.log(isOpen);

  // const isOpenMock = true;
  return (
    <div className="accordion">
      <div
        role="presentation"
        className={`accordion__title ${isOpen ? 'accordion__title--open' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {title}
      </div>
      <div
        className={`accordion__item ${!isOpen ? 'accordion__item--collapsed' : ''
          }`}
      >
        <div className="accordion__content">{children}</div>
      </div>
    </div>
  )
}

export default Accordion
