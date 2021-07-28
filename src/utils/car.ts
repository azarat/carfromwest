import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { ILot } from '../Types/Types'
import cacheData from 'memory-cache'

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

  const url = `https://api.carsfromwest.com/search/v1/lots/${auction}/${lotNumber}`

  try {
    let carResponse = cacheData.get(lot)

    if (!carResponse) {
      const res = await fetch(url, {
        headers: {
          Authorization: 'Basic Y2Z3ODpQWmwwZWcsQjky',
          'X-AUTH-TOKEN': '1974a9f80cfe4c0c7ab8a6235918ef8eae58ff82',
        },
      })

      carResponse = (await res.json()) as ILot

      cacheData.put(lot, carResponse, 1000 * 60 * 60)

      if (!res.ok) {
        return {
          redirect: {
            destination: '/order-page',
            permanent: false,
          },
        }
      }
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
      destination: '/order-page',
      permanent: false,
    },
  }
}
