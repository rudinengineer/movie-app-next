import React from 'react'
import TvDetail from '~/components/ui/tv-detail'
import { sendRequestTMDB } from "~/lib/tmdb";
import { MovieType } from "~/types/movie";
import { POSTER_BASEURL } from "~/constants/tmdb";

type Props = {
    params: {
        movieId: string
    }
}

export async function generateMetadata({params}: Props) {
  const response = await sendRequestTMDB(`/tv/${params.movieId}`)
  const data: MovieType = await response?.data
  
  return {
      title: data.name ?? data.original_name,
      description: data.overview,
      openGraph: {
          title: data.name ?? data.original_name,
          type: 'website',
          url: process.env.BASE_URL + '/tv/' + data.id,
          description: data.overview,
          images: POSTER_BASEURL + data.poster_path,
      }
  }
}

export default function Page({params}: Props) {

  return (
    <TvDetail movieId={params.movieId} />
  )
}