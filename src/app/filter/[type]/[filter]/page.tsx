"use client"
// import { useSearchParams } from 'next/navigation'
import React from 'react'
import { sendRequestTMDB } from '~/lib/tmdb'
import { MovieType } from '~/types/movie'
import MovieSkeleton from '~/components/skeleton/MovieSkeleton'
import Movie from '~/components/Movie'
import Pagination from '~/components/ui/Pagination'

type Props = {
    params: {
        type: string,
        filter: string
    }
}

export default function Search({params}: Props) {
  const [response, setResponse] = React.useState<any>([])
  const [movies, setMovies] = React.useState<Array<MovieType>>([])
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [paginateCount, setPaginateCount] = React.useState<Array<any>>([])
  const [page, setPage] = React.useState<number>(1)

  React.useEffect(() => {
    setLoading(true)
    async function fetchFilter() {
        const response = await sendRequestTMDB(`/${params.type}/${params.filter.replaceAll('-', '_')}?page=${page}`)
        const data = await response?.data
        if ( data ) {
            setResponse(data)
            setMovies(data?.results)
            let result = []
            for (let index = 0; index < (Number(data?.total_pages) > 9 ? 9 : Number(data?.total_pages)); index++) {
                if ( page > (Number(data?.total_pages) - page) ) {
                    result.push(Number(data?.total_pages) - index)
                } else {
                    result.push(page + index)
                }
            }
            setPaginateCount(result)
            setLoading(false)
        }
    }

    fetchFilter()
  }, [page, params])

  return (
    <div>
      <div className="p-3">
        <div className="mt-4 grid grid-cols-3 ss:grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-3">
          {
            isLoading ? (
                [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20].map(({}, index: number) => (
                    <MovieSkeleton key={index} />
                ))
            ) : (
                movies.length > 0 && movies.map((value: any, index: number) => (
                    <div className='mb-2' key={index}>
                        <Movie movie={value} type={params.type ? params.type : null} />
                    </div>
                ))
            )
          }
        </div>

        {
          (!isLoading && !movies.length) && (
              <div className="mt-2 w-full flex justify-center">
                  <h1 className="text-center font-semibold">Data tidak ditemukan.</h1>
              </div>
          )
        }

        {
            (!isLoading && movies.length > 0) && (
                <Pagination baseUrl={`/${params.type}/${params.filter}`} pagination={paginateCount} total_pages={response?.total_pages} page={page} type={params.type} filter={params.filter} setPage={setPage} />
            )
        }
      </div>
    </div>
  )
}