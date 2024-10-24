import { POSTER_BASEURL } from "~/constants/tmdb"
import { MovieType } from "~/types/movie"

type Props = {
    movie: MovieType
}

export async function generateMetadata({movie}: Props) {
    return {
        title: movie.title ?? movie.original_title,
        description: movie.overview,
        openGraph: {
            title: movie.title ?? movie.title,
            images: [POSTER_BASEURL + movie.poster_path]
        }
    }
}

export default function MovieDetailMetadata({}: Props) {
  return (
    <div></div>
  )
}