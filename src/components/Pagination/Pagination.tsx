import { PaginationProps } from './Types'

const LEFT_PAGE = 'LEFT'
const RIGHT_PAGE = 'RIGHT'

const range = (from: number, to: number, step = 1) => {
  let i = from
  const range = []

  while (i <= to) {
    range.push(i)
    i += step
  }
  return range
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  cars,
  setPage,
}): JSX.Element | null => {
  const totalPages = (cars && Math.ceil(cars.total / 12)) || 0

  const pageNeighbours = 1
  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3
    const totalBlocks = totalNumbers + 2

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, page - pageNeighbours)
      const endPage = Math.min(totalPages - 1, page + pageNeighbours)
      let pages: any = range(startPage, endPage)

      const hasLeftSpill = startPage > 2
      const hasRightSpill = totalPages - endPage > 2
      const spillOffset = totalNumbers - (pages.length + 1)

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1)
          pages = [LEFT_PAGE, ...extraPages, ...pages]
          break
        }

        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset)
          pages = [...pages, ...extraPages, RIGHT_PAGE]
          break
        }

        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
          break
        }
      }

      return [1, ...pages, totalPages]
    }
    return range(1, totalPages)
  }

  const paginationItem = []
  for (let i = 1; i < totalPages; i++) {
    paginationItem.push(i)
  }

  if (totalPages === 1) {
    return null
  }

  const handleMoveLeft = () => {
    setPage((prev) => prev - 1)
  }

  const handleMoveRight = () => {
    setPage((prev) => prev + 1)
  }

  const handleClickItem = (item: any) => {
    if (typeof window !== 'undefined')
      window.scrollTo({ behavior: 'smooth', top: 0 })
    setPage(item)
  }

  const pages: any[] = fetchPageNumbers()

  return (
    <nav>
      <ul className="pagination">
        {pages &&
          pages.map((item: any, index: number) => {
            if (item === LEFT_PAGE)
              return (
                <li key={`${item}${index}`} className="pagination__item">
                  <button
                    className="pagination__item-btn"
                    aria-label="Previous"
                    onClick={handleMoveLeft}
                  >
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </button>
                </li>
              )
            if (item === RIGHT_PAGE)
              return (
                <li key={`${item}${index}`} className="pagination__item">
                  <button
                    className="pagination__item-btn"
                    aria-label="Next"
                    onClick={handleMoveRight}
                  >
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </button>
                </li>
              )
            return (
              <li
                key={`${page}${index}`}
                className={`pagination__item ${
                  item === page ? 'pagination__item--active' : ''
                }`}
              >
                <button
                  className="pagination__item-btn"
                  aria-label="Next"
                  onClick={() => handleClickItem(item)}
                >
                  {item}
                </button>
              </li>
            )
          })}
      </ul>
    </nav>
  )
}

export default Pagination
