import React, { useEffect } from 'react'

const Error500: React.FC = (): JSX.Element => {
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.removeItem('filter')
  }, [])
  return (
    <div className="error-page">
      <h1 className="error-page-title">
        Упс, щось пішло не так
        <br />
        Ми вже працюємо над цим
      </h1>
    </div>
  )
}

export default Error500
