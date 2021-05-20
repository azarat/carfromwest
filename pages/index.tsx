import { NextPage } from 'next'
import HelloWord from '../src/components/HelloWorld/HelloWord'
import SearchInput from '../src/components/SearchInput/SearchInput'

const IndexPage: NextPage = () => {
  return (
    <>
      <HelloWord />
      <HelloWord />
      <HelloWord />
      <SearchInput />
    </>
  )
}
export default IndexPage
