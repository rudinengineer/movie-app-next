"use client"
import React from 'react'
import { POSTER_BASEURL } from '~/constants/tmdb'
import { sendRequestTMDB } from '~/lib/tmdb'
import { MovieType } from '~/types/movie'

type Props = {
    movieId: string
}

export default function RedirectMovie({movieId}: Props) {
  const [movie, setMovie] = React.useState<MovieType>()

  React.useEffect(() => {
    async function fetchMovie() {
        const response = await sendRequestTMDB(`/movie/${movieId}`)
        const data = await response?.data
        
        if ( data ) {
            setMovie(data)
        }
    }

    fetchMovie()
  }, [movieId])

  return (
    movie && (
        <div className="container animate__animated animate__fadeIn">
            <div className="row d-flex justify-content-center text-center">
                <div className="col-md-6 link-content ">
                    <main id="links" className="my-1">
                        <div className="row">
                            <div id="biolink_block_id_131830" data-biolink-block-id="131830" className="col-12 my-1">
                                <div className="d-flex flex-column align-items-center">
                                    <img src={ POSTER_BASEURL + movie.poster_path } className="link-image link-avatar-round" style={{ width: '125px', height: '125px', borderWidth: '3px', borderColor: '#dc3535', borderStyle: 'solid', objectFit: 'contain' }} alt='' loading="lazy" data-border-width data-border-avatar-radius data-border-style data-border-color data-avatar />
                                </div>
                            </div>
                            <div id="biolink_block_id_131836" data-biolink-block-id="131836" className="col-12 my-1">
                                <h1 className="h1 m-0 text-break" style={{ color: '#ffffff', textAlign: 'center' }} data-text data-text-color data-text-alignment>{ movie.title }</h1>
                            </div>
                            <div id="biolink_block_id_131837" data-biolink-block-id="131837" className="col-12 my-1">
                                <div className="card link-btn-rounded" style={{ borderWidth: '0px', borderColor: '#000000',borderStyle: 'solid', background: '#FFB8B800', boxShadow: '0px 0px 20px 0px #00000010' }} data-border-width data-border-radius data-border-style data-border-color data-border-shadow data-background-color>
                                    <div className="card-body text-break" style={{ color: '#ffffff', textAlign: 'center' }} data-text data-text-color data-text-alignment>{ movie.overview }</div>
                                    </div>
                            </div>
                            <div id="biolink_block_id_131825" data-biolink-block-id="131825" className="col-12 my-1">
                                <a href="/?do=watch-movies&id=945961&title=Alien: Romulus" data-track-biolink-block-id="131825" target="_self" rel="dofollow" className="btn btn-block btn-primary link-btn link-hover-animation-smooth link-btn-round  animate__animated animate__repeat-2 animate__pulse animate__delay-2s" style={{ background: '#dc3535', color: '#F9F9F9', borderWidth: '0px',borderColor: '#000000', borderStyle: 'solid', boxShadow: '0px 0px 20px 0px #00000010', textAlign: 'center' }} data-text-color data-border-width data-border-radius data-border-style data-border-color data-border-shadow data-animation data-background-color data-text-alignment>
                                    <div className="link-btn-image-wrapper link-btn-round">
                                        <img src={ POSTER_BASEURL + movie.poster_path } className="link-btn-image" loading="lazy" />
                                    </div>
                                    <span data-icon>
                                    </span>
                                    <span data-name>Watch Now</span>
                                </a>
                            </div>
                            <div id="biolink_block_id_131825" data-biolink-block-id="131825" className="col-12 my-1" style={{  visibility: 'hidden' }}>
                                <a href="/?do=watch-movies&id=945961&title=Alien: Romulus" data-track-biolink-block-id="131825" target="_self" rel="dofollow" className="btn btn-block btn-primary link-btn link-hover-animation-smooth link-btn-round  animate__animated animate__repeat-2 animate__pulse animate__delay-2s" style={{ background: '#dc3535', color: '#F9F9F9', borderWidth: '0px',borderColor: '#000000', borderStyle: 'solid', boxShadow: '0px 0px 20px 0px #00000010', textAlign: 'center' }} data-text-color data-border-width data-border-radius data-border-style data-border-color data-border-shadow data-animation data-background-color data-text-alignment>
                                    <div className="link-btn-image-wrapper link-btn-round">
                                        <img src="https://cdn.jali.me/uploads/avatars/9491b68236e47b119212b4f57cb1b493.gif?resize=300,450" className="link-btn-image" loading="lazy" />
                                    </div>
                                    <span data-icon>
                                    </span>
                                    <span data-name>{ movie.title }</span>
                                </a>
                            </div>
                        </div>
                    </main>
                    <footer id="footer" className="link-footer">
                    <div id="branding" className="link-footer-branding">
                    </div>
                </footer>
                </div>
            </div>
        </div>
    )
  )
}