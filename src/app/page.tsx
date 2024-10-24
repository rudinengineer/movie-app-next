"use client"
import React from 'react'
import { sendRequestTMDB } from '~/lib/tmdb'
import Movie from '../components/Movie'
import MovieSkeleton from '../components/skeleton/MovieSkeleton'
import { MovieType } from '../types/movie';
import { useSearchParams } from 'next/navigation'
import Slider from '~/components/ui/Slider'
import Pagination from '~/components/ui/Pagination';

type Props = {}

export default function Home({}: Props) {
  const [response, setResponse] = React.useState<any>([])
  const [movies, setMovies] = React.useState<Array<MovieType>>([])
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [paginateCount, setPaginateCount] = React.useState<Array<any>>([])
  const params = useSearchParams()
  const page: number = params.has('page') ? Number(params.get('page')) : 1

  React.useEffect(() => {
    setLoading(true)
    async function fetchMovies() {
      const response = await sendRequestTMDB('/trending/all/week?page=' + page)
      const data = await response?.data
      if ( data ) {
        setResponse(data)
        setMovies(data?.results)
        let result = []
        for (let index = 0; index < (Number(data?.total_pages) > 9 ? 9 : Number(data?.total_pages)); index++) {
          if ( page > (Number(data?.total_pages) - page) ) {
            result.push(page - index)
          } else {
            result.push(page + index)
          }
        }
        setPaginateCount(result)
        setLoading(false)
      }
    }

    fetchMovies()
  }, [page])

  return (
    <div>
      <div className="px-3 p-2 rounded-md overflow-hidden">
        <Slider movies={movies} />
      </div>
      <div className="p-3">
        <div>
          <h1 className='text-2xl font-bold'>Paling Populer✨</h1>
        </div>
        <div className="mt-4 grid grid-cols-3 ss:grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-3">
          {
            isLoading ? (
                [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20].map(({}, index: number) => (
                    <MovieSkeleton key={index} />
                ))
            ) : (
                movies.length > 0 && movies.map((value: any, index: number) => (
                    <div className='mb-2' key={index}>
                        <Movie movie={value} />
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
          movies.length > 0 && (
            <Pagination pagination={paginateCount} page={page} total_pages={response?.total_pages} />
          )
        }
      </div>
    </div>
  )
}