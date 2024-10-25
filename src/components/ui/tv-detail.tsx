"use client"
import React from 'react'
import { POSTER_BASEURL } from '~/constants/tmdb'
import RelatedMovies from '../RelatedMovies'
import { sendRequestTMDB } from '~/lib/tmdb'
import { StarIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
    movieId: any
}

export default function TvDetail({movieId}: Props) {
  const [movie, setMovie] = React.useState<any>()

  React.useEffect(() => {
    async function fetchMovie() {
        const response = await sendRequestTMDB(`/tv/${movieId}`)
        const data = await response?.data
        
        if ( data ) {
            setMovie(data)
        }
    }

    fetchMovie()
  }, [movieId])

  return (
    movie && (
        <div>
            <div className='px-4 sm:px-0'>
                <div className='relative'>
                    <div className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
                    <Image width={100} height={100} src={ POSTER_BASEURL + movie?.backdrop_path } alt={movie?.name} className='w-full max-h-[50vh] rounded-sm' />
                </div>
                <div className='mt-6'>
                    <div className="flex flex-wrap gap-5">
                        <div className='w-full sm:w-fit overflow-hidden flex-shrink-0 flex justify-center items-center'>
                            <Image
                                width={100}
                                height={100}
                                src={POSTER_BASEURL + movie?.poster_path}
                                alt={movie?.name}
                                className='w-2/3 sm:w-full h-full max-h-96 rounded-sm'
                                data-border-width
                                data-border-avatar-radius
                                data-border-style
                                data-border-color
                                data-avatar
                            />
                        </div>
                        <div className='w-full sm:w-fit p-1 flex-shrink-0'>
                            <h1 className="text-2xl sm:text-3xl font-bold">{ movie?.name }</h1>
                            <h1 className="text-base font-medium text-[#6a6a6a]">{ movie?.original_name }</h1>

                            <p className='mt-0.5 text-gray-200'>{ movie?.tagline }</p>

                            <div className='mt-2'>
                                <h1 className='text-xs text-gray-300'>Release date : {movie?.first_air_date}</h1>
                                <h1 className='mt-1 text-xs text-gray-300 flex gap-0.5'><span className='flex-shrink-0'>Production country :</span> 
                                    <div className="flex items-center gap-0.5 flex-wrap">
                                        {
                                            movie?.production_countries?.map((value: any, index: number) => (
                                                <h1 key={index}>{ value.name + (index + 1 < movie?.production_countries?.length ? ', ' : '') }</h1>
                                            ))
                                        }
                                    </div>
                                </h1>
                                <h1 className='mt-1 text-xs text-gray-300 flex gap-0.5'><span className='flex-shrink-0'>Production company :</span> 
                                    <div className="flex items-center gap-0.5 flex-wrap">
                                        {
                                            movie?.production_companies?.map((value: any, index: number) => (
                                                <h1 key={index}>{ value.name + (index + 1 < movie?.production_companies?.length ? ', ' : '') }</h1>
                                            ))
                                        }
                                    </div>
                                </h1>
                                <h1 className='mt-1 text-xs text-gray-300 flex gap-0.5'><span className='flex-shrink-0'>Network :</span> 
                                    <div className="flex items-center gap-0.5 flex-wrap">
                                        {
                                            movie?.networks?.map((value: any, index: number) => (
                                                <h1 key={index}>{ value.name + (index + 1 < movie?.networks?.length ? ', ' : '') }</h1>
                                            ))
                                        }
                                    </div>
                                </h1>
                                <h1 className='mt-1 text-xs text-gray-300'>Status : { movie?.status }</h1>
                                <h1 className='mt-1 text-xs text-gray-300'>Total Season : { movie?.number_of_seasons }</h1>
                                <h1 className='mt-1 text-xs text-gray-300'>Total episode : { movie?.number_of_episodes }</h1>
                                <h1 className='mt-1 text-xs text-gray-300'>Popularity : { movie?.popularity }</h1>
                                <div className="mt-2 sm:flex gap-3">
                                    <div className="px-3 p-2 w-fit rounded-sm bg-primary">
                                        <h1 className="text-base font-semibold">{ movie?.vote_average }</h1>
                                    </div>
                                    <div>
                                        <div className="mt-2 sm:mt-0 flex items-center gap-1">
                                            {
                                                [1,2,3,4,5,6,7,8,9].map(({}, index: number) => (
                                                    <StarIcon key={index} className={`${Number(movie?.vote_average.toString()?.split('.')[0]) >= index + 1 ? 'text-yellow-400' : 'text-light'} size-5`} />
                                                ))
                                            }
                                        </div>
                                        <h1 className='mt-1.5 text-xs'>Total Vote : { movie?.vote_count }</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-4 items-center">
                    {
                        movie?.genres?.map((value: any, index: number) => (
                            <Link href={`/search?genre=${value.name}`} key={index} className='bg-primary px-3 py-1.5 rounded-sm transition ease-in-out hover:bg-opacity-80'>
                                <h1>{ value.name }</h1>
                            </Link>
                        ))
                    }
                </div>
                <div className="mt-6">
                    <p className='text-gray-200'>{ movie?.overview }</p>
                </div>
            </div>

            <div className="mt-12">
                <RelatedMovies movieId={movieId} type='tv' />
            </div>
        </div>
    )
  )
}