import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

export const getCarPageProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> => {
  if (!context.params) {
    return {
      props: { message: 'error' },
    }
  }

  const { lot = '' } = context.params

  const [auction, lotNumber] = Array.isArray(lot) ? lot : lot.split('-')

  const url = `https://api-stage.carsfromwest.com/search/v1/lots/${auction}/${lotNumber}`

  console.log(url)

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: 'Basic Y2Z3ODpQWmwwZWcsQjky',
        'X-AUTH-TOKEN': '1d21e20bd0b8d46297b102d28d5d070eb9b626c3',
      },
    })
    const carResponse = await res.json()
    console.log(carResponse)

    if (res.status !== 200) {
      return {
        redirect: {
          destination: '/catalog',
          permanent: true,
        },
      }
    }
    return {
      props: {
        carResponse,
      },
    }
  } catch (e) {
    console.error(e.message)
  }
  console.log(context.params.vin)
  return {
    props: { message: 'undefined vin' },
  }
}
