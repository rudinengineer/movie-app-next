"use client"
import { MovieType } from '../types/movie'
import { POSTER_BASEURL } from '../constants/tmdb'
import { EyeIcon, StarIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'

type Props = {
    movie: MovieType,
    type?: string | null
}

export default function Movie({movie, type}: Props) {
  return (
    <div>
        <Link href={(type ?? movie.media_type) === 'movie' || (type ?? movie.media_type) === 'tv' ? `/${type ?? (movie.media_type === 'tv' ? 'tv' : 'movie')}/${movie.id}` : ''}>
            <div className='relative group overflow-hidden aspect-[9/12]'>
                {
                    movie?.media_type && (
                        <div className="absolute top-0 left-0 px-2 py-0.5 text-xs sm:text-sm rounded-tr-sm rounded-br-sm bg-primary font-medium z-[2]">{ type ?? movie.media_type }</div>
                    )
                }
                <div className="w-full h-full justify-center items-center absolute bg-black bg-opacity-10 backdrop-blur-[1.5px] z-[1] transition ease-in-out hidden group-hover:flex">
                    <EyeIcon className='size-12' />
                </div>
                <img src={POSTER_BASEURL + (movie.poster_path ?? movie.profile_path)} alt={movie.name} className='w-full h-full rounded-sm transition duration-200 ease-in-out group-hover:scale-110' />
            </div>
        </Link>
        <div>
            <Link href={(type ?? movie.media_type) === 'movie' || (type ?? movie.media_type) === 'tv' ? `/${type ?? (movie.media_type === 'tv' ? 'tv' : 'movie')}/${movie.id}` : ''} className="w-full mt-3 text-base text-limit-1 font-semibold transition ease-in-out hover:text-primary">{ movie.name ?? movie.title }</Link>
            <div className="w-full flex-between center">
                <h1 className="font-medium text-[#6a6a6a]">{ movie.first_air_date ? movie.first_air_date?.split('-')[0] : movie.release_date?.split('-')[0] }</h1>
                <div className="flex items-center gap-0.5">
                    <StarIcon className='size-[16px] text-yellow-400' />
                    <span className='text-[10px] sm:text-xs'>{ movie.vote_average }</span>
                </div>
            </div>
        </div>
    </div>
  )
}