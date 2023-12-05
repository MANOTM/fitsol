import { Link, useLocation } from 'react-router-dom'
import './pagination.css'

export default function Pagination({ data, current_path }) {
  return (
    <div className='pagination'>
      <Link to={`${current_path}&page=${data?.current_page - 1}`} className={`swipe-btn ${data?.current_page == 1 && 'not-active'}`}>
        PREV
      </Link>
      <div className="Controls_wrapper">
        <div className="pages">
          <div className="pages">

            {Array.from({ length: data?.last_page }, (_, index) => (
              <div key={index}>
                {(index < 3) ?
                  <Link to={`${current_path}&page=${index + 1}`} className={`page ${data?.current_page == index + 1 && 'active'}`}>{index + 1}</Link>
                  : (index + 1 == data?.last_page ?
                    <>
                      <Link className='page'>...</Link>
                      <Link to={`${current_path}&page=${data?.last_page}`} className={`page ${data?.current_page == index + 1 && 'active'}`}>{data?.last_page}</Link>
                    </> : ''
                  )
                }

              </div>
            ))}
          </div>
        </div>
        <p className='small-text'>You've viewed {data?.to} of {data?.total} products</p>
      </div>
      <Link to={`${current_path}&page=${data?.current_page + 1}`} className={`swipe-btn ${data?.current_page == data?.last_page && 'not-active'}`}>
        NEXT
      </Link>
    </div>
  )
}
