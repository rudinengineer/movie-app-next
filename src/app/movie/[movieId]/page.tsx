import React from 'react'
import MovieDetail from '~/components/ui/movie-detail'
import { sendRequestTMDB } from "~/lib/tmdb";
import { MovieType } from "~/types/movie";
import { POSTER_BASEURL } from "~/constants/tmdb";
import { BASE_URL } from '~/constants/app';

type Props = {
    params: {
        movieId: string
    }
}

export async function generateMetadata({params}: Props) {
  const response = await sendRequestTMDB(`/movie/${params.movieId}`)
  const data: MovieType = await response?.data
  
  return {
      title: data.title ?? data.original_title,
      description: data.overview,
      openGraph: {
          title: data.title ?? data.original_title,
          type: 'website',
          url: BASE_URL + '/movie/' + data.id,
          description: data.overview,
          images: POSTER_BASEURL + data.poster_path
      }
  }
}

export default function Page({params}: Props) {
  return (
      <MovieDetail movieId={params.movieId} />
  )
}