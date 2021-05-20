import { useState } from 'react'

type AccordionProps = {
  title: string
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
}): JSX.Element => {
  const [isOpen, setOpen] = useState(false)
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
        className={`accordion__item ${
          !isOpen ? 'accordion__item--collapsed' : ''
        }`}
      >
        <div className="accordion__content">{children}</div>
      </div>
    </div>
  )
}

export default Accordion
