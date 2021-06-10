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

  const url = `https://carsfromwest.com/api/auction/lots/auction=${auction};auctionLotId=${lotNumber}`

  try {
    const res = await fetch(url)
    const carResponse = await res.json()

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
