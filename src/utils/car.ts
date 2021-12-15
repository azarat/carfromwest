import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { ILot } from '../Types/Types'

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

  const url = `http://46.101.185.57:8080/search/v1/lots/${auction}/${lotNumber}`

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: 'Basic Y2Z3ODpQWmwwZWcsQjky',
        'X-AUTH-TOKEN': '1974a9f80cfe4c0c7ab8a6235918ef8eae58ff82',
      },
    })

    const carResponse = (await res.json()) as ILot

    if (!res.ok) {
      return {
        redirect: {
          destination: '/error',
          permanent: false,
        },
      }
    }

    if (carResponse.saleInfo.sold)
      return {
        redirect: {
          destination: '/order-form',
          permanent: false,
        },
      }

    return {
      props: {
        carResponse,
      },
    }
  } catch (e) {
    console.log(e)
  }
  return {
    redirect: {
      destination: '/error',
      permanent: false,
    },
  }
}
