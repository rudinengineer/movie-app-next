import type { Metadata } from "next";
import React from 'react'
import RedirectMovie from "~/components/ui/redirect-movie";
import { BASE_URL } from '~/constants/app'
import { POSTER_BASEURL } from '~/constants/tmdb'
import { sendRequestTMDB } from '~/lib/tmdb'
import { MovieType } from '~/types/movie'

type Props = {
    params: {
        movieId: string
    }
}

export async function generateMetadata({params}: Props) {
    const response = await sendRequestTMDB(`/movie/${params.movieId}`)
    const data: MovieType = await response?.data

    const metadata: Metadata = {
        title: data.title ?? data.original_title,
        description: data.overview,
        openGraph: {
            title: data.title ?? data.original_title,
            type: 'website',
            url: BASE_URL + '/movie/' + data.id,
            description: data.overview,
            images: POSTER_BASEURL + data.poster_path,
        },
        other: {
          type: 'website',
          url: BASE_URL + '/movie/' + data.id
        }
    }
    
    return metadata
  }

export default function page({params}: Props) {
  return (
    <RedirectMovie movieId={params.movieId} />
  )
}