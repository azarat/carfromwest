import React, { useEffect } from 'react'

const Error500: React.FC = (): JSX.Element => {
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.removeItem('filter')
  }, [])
  return <div>Упс, что-то пошло не так</div>
}

export default Error500
