"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { POSTER_BASEURL } from '~/constants/tmdb'
import { MovieType } from '~/types/movie'
import "swiper/css";

type Props = {
    movies: Array<MovieType>
}

export default function Slider({movies}: Props) {
  return (
    
    <Swiper
    >
        {
        movies.map((value, index: number) => value.backdrop_path && (
            <SwiperSlide key={index} className='relative'>
            <div className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
            <div className="w-full absolute left-0 bottom-0 bg-light rounded-tl-xl rounded-tr-xl z-[2] p-4 px-6 bg-opacity-15 backdrop-blur-md">
                <h1 className="text-limit-1 text-2xl font-bold">{ value.title ?? value.name }</h1>
                <h1 className="text-limit-1 text-base font-medium text-gray-400">{ value.original_title ?? value.original_name }</h1>
                <p className='mt-1 w-[90%] hidden sm:block'>{ value.overview.substring(0, 500) + (value.overview.length > 500 && '...') }</p>
                <p className='mt-1 w-[90%] sm:hidden'>{ value.overview.substring(0, 80) + (value.overview.length > 80 && '...') }</p>
            </div>
            <img src={ POSTER_BASEURL + value.backdrop_path } className='w-full aspect-[16/7] object-cover object-center' />
            </SwiperSlide>
        ))
        }
    </Swiper>
  )
}