import React, { useEffect } from 'react'

const Error500: React.FC = (): JSX.Element => {
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.removeItem('filter')
  }, [])
  return (
    <div className="error-page">
      <h1 className="error-page-title">
        Упс, что-то пошло не так
        <br />
        Мы уже работаем над этим
      </h1>
    </div>
  )
}

export default Error500
