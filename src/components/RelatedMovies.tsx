"use client"
import React from 'react'
import { MovieType } from '../types/movie'
import MovieSkeleton from './skeleton/MovieSkeleton'
import Movie from './Movie'
import { sendRequestTMDB } from '../lib/tmdb'

type Props = {
    movieId: string | undefined
    type?: string
}

export default function RelatedMovies({movieId, type}: Props) {
  const [movies, setMovies] = React.useState<Array<MovieType>>([])
  const [isLoading, setLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    async function fetchMovies() {
      const response = await sendRequestTMDB(`/${type}/${movieId}/recommendations`)
      const data = await response?.data

      if ( data ) {
        setMovies(data?.results)
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])

  return (
    <div className='p-1'>
        <div>
          <h1 className='text-xl font-bold'>Related Movies✨</h1>
        </div>
        <div className="mt-4 grid grid-cols-3 ss:grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-3">
          {
            isLoading ? (
                [1,2,3,4,5,6,7,8,9,10,11,12].map(({}, index: number) => (
                    <MovieSkeleton key={index} />
                ))
            ) : (
                movies.map((value: any, index: number) => (
                    <div className='mb-2' key={index}>
                        <Movie movie={value} type={type} />
                    </div>
                ))
            )
          }
        </div>
        {
            (!isLoading && !movies.length) && (
                <div className="w-full flex justify-center">
                    <h1 className="text-center font-semibold">Data tidak ditemukan.</h1>
                </div>
            )
        }
      </div>
  )
}