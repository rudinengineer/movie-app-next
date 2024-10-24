"use client"
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { sendRequestTMDB } from '~/lib/tmdb'
import { MovieType } from '~/types/movie'
import MovieSkeleton from '../skeleton/MovieSkeleton'
import Movie from '../Movie'
import Pagination from './Pagination'

type Props = {
    keyword: string
}

export default function Search({keyword}: Props) {
  const [response, setResponse] = React.useState<any>([])
  const [movies, setMovies] = React.useState<Array<MovieType>>([])
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [paginateCount, setPaginateCount] = React.useState<Array<any>>([])
  const params = useSearchParams()
  const page: number = params.has('page') ? Number(params.get('page')) : 1

  React.useEffect(() => {
    setLoading(true)
    async function fetchMovies() {
      const response = await sendRequestTMDB(`/search/multi?query=${keyword}&page=${page}`)
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

    async function fetchFilter() {
        const response = await sendRequestTMDB(`/${params.get('type')}/${params.get('filter')?.replace('-', '_').replace('-', '_')}?page=${page}`)
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

    if ( !params.has('type') && !params.has('filter') ) {
        fetchMovies()
    } else {
        fetchFilter()
    }
  }, [keyword, page, params.get('type'), params.get('filter')])

  return (
    <div>
      <div className="p-3">
        {
            !params.has('type') && !params.has('filter') && (
                <div>
                    <h1 className='text-2xl font-bold'>Hasil pencarian dari "{ keyword }"</h1>
                </div>
            )
        }
        <div className="mt-4 grid grid-cols-3 ss:grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-3">
          {
            isLoading ? (
                [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20].map(({}, index: number) => (
                    <MovieSkeleton key={index} />
                ))
            ) : (
                movies.length > 0 && movies.map((value: any, index: number) => (
                    <div className='mb-2' key={index}>
                        <Movie movie={value} type={params.has('type') ? params.get('type') : null} />
                    </div>
                ))
            )
          }
        </div>

        {
          !movies.length && (
              <div className="mt-2 w-full flex justify-center">
                  <h1 className="text-center font-semibold">Data tidak ditemukan.</h1>
              </div>
          )
        }

        {
            (!isLoading && movies.length > 0) && (
                <Pagination pagination={paginateCount} keyword={keyword} total_pages={response?.total_pages} page={page} type={params.get('type')} filter={params.get('filter')} />
            )
        }
      </div>
    </div>
  )
}