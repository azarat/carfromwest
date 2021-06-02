import Link from 'next/link'
import React from 'react'

const FormBlock: React.FC = () => {
  return (
    <section className="form-block">
      <h2 className="form-block__title">
        Есть вопросы или что-то не поняли? Звоните и мы ответим на них!
      </h2>
      <Link href="/check">
        <a>
          <button className="form-block__button">Связаться с нами</button>
        </a>
      </Link>
    </section>
  )
}

export default FormBlock
