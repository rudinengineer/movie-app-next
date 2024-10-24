"use client"
import { Bars3Icon, ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/16/solid'
import React from 'react'
import { app_name } from '../constants/app'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Props = {}

export default function Navbar({}: Props) {
  const navigate = useRouter()
  const [searchShow, setSearchShow] = React.useState<boolean>(false)
  const [sidebarShow, setSidebarShow] = React.useState<boolean>(false)
  const [keyword, setkeyword] = React.useState<string>('')

  return (
    <nav className="w-full p-3 px-4 sm:px-12 bg-darkSecondary bg-opacity-80 backdrop-blur-md fixed top-0 left-0 z-50">
        <div className="relative flex-between-center">
            <button className='sm:hidden' onClick={() => {setSidebarShow(state => !state)}}>
                {
                    sidebarShow ? (
                        <XMarkIcon className='icon-size' />
                    ) : (
                        <Bars3Icon className='icon-size' />
                    )
                }
            </button>

            <div className="flex items-center gap-12">
                <Link href={'/'} className='text-xl font-bold'>{ app_name }</Link>
                <div className="hidden sm:flex gap-6">
                    <ul className='group relative'>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <h1 className='font-semibold text-base'>Movies</h1>
                            <ChevronDownIcon className='size-5' />
                        </div>
                        <div className="hidden group-hover:flex absolute left-0 z-50 w-44">
                            <div className="w-full mt-3 px-4 p-3 bg-darkSecondary rounded-md">
                                <li>
                                    <Link href={'/search?type=movie&filter=now-playing'} className='link'>Now Playing</Link>
                                </li>
                                <li className='mt-2.5'>
                                    <Link href={'/search?type=movie&filter=popular'} className='link'>Popular</Link>
                                </li>
                                <li className='mt-2.5'>
                                    <Link href={'/search?type=movie&filter=top-rated'} className='link'>Top Rated</Link>
                                </li>
                                <li className='mt-2.5'>
                                    <Link href={'/search?type=movie&filter=upcoming'} className='link'>Upcoming</Link>
                                </li>
                            </div>
                        </div>
                    </ul>
                    <ul className='group relative'>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <h1 className='font-semibold text-base'>TV Series</h1>
                            <ChevronDownIcon className='size-5' />
                        </div>
                        <div className="hidden group-hover:flex absolute left-0 z-50 w-44">
                            <div className="w-full mt-3 px-4 p-3 bg-darkSecondary rounded-md">
                                <li>
                                    <Link href={'/search?type=tv&filter=airing-today'} className='link'>Airing Today</Link>
                                </li>
                                <li className='mt-2.5'>
                                    <Link href={'/search?type=tv&filter=on-the-air'} className='link'>On The Air</Link>
                                </li>
                                <li className='mt-2.5'>
                                    <Link href={'/search?type=tv&filter=popular'} className='link'>Popular</Link>
                                </li>
                                <li className='mt-2.5'>
                                    <Link href={'/search?type=tv&filter=top-rated'} className='link'>Top Rated</Link>
                                </li>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>

            <form
                className='hidden sm:flex'
                onSubmit={(e) => {
                    e.preventDefault()
                    navigate.push('/search/' + keyword)
                }}
            >
                <div className="relative flex items-center">
                    <MagnifyingGlassIcon className='size-5 absolute left-2.5' />
                    <input
                        type="text"
                        onChange={(e) => {setkeyword(e.target.value)}}
                        className='outline-none bg-[#282828] w-80 px-4 pl-9 py-2.5 rounded-md'
                        placeholder='Search'
                    />
                </div>
            </form>

            <button className='sm:hidden' onClick={() => {setSearchShow(state => !state)}}>
                <MagnifyingGlassIcon className='icon-size' />
            </button>

            {
                searchShow && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            navigate.push('/search/' + keyword)
                        }}
                        className='w-full absolute left-0 top-full p-2 z-50'
                    >
                        <div className="mt-3">
                            <input type="text" autoComplete='off' placeholder='Search' className='input w-full px-4 py-2 rounded-full' onChange={(e) => {setkeyword(e.target.value)}} />
                        </div>
                    </form>
                )
            }

            {
                sidebarShow && (
                    <div className="w-full absolute left-0 top-full z-50 sm:hidden">
                        <div className="mt-4 bg-dark rounded-md bg-opacity-85 p-2 pb-4 px-5">
                            <div>
                                <h1 className="text-lg font-semibold">Movies</h1>
                                <div className="mt-3 grid grid-cols-2 gap-3">
                                    <Link href={'/search?type=movie&filter=now-playing'} className='link'>
                                        <span className='text-xs'>-</span> <span>Now Playing</span>
                                    </Link>
                                    <Link href={'/search?type=movie&filter=popular'} className='link'>
                                        <span className='text-xs'>-</span> <span>Popular</span>
                                    </Link>
                                    <Link href={'/search?type=movie&filter=top-rated'} className='link'>
                                        <span className='text-xs'>-</span> <span>Top Rated</span>
                                    </Link>
                                    <Link href={'/search?type=movie&filter=upcoming'} className='link'>
                                        <span className='text-xs'>-</span> <span>Upcoming</span>
                                    </Link>
                                </div>
                            </div>
                            <div className='mt-6'>
                                <h1 className="text-lg font-semibold">TV SERIES</h1>
                                <div className="mt-3 grid grid-cols-2 gap-2.5">
                                    <Link href={'/search?type=tv&filter=airing-today'}>
                                        <span className='text-xs'>-</span> <span className='link'>Airing Today</span>
                                    </Link>
                                    <Link href={'/search?type=tv&filter=on-the-air'}>
                                        <span className='text-xs'>-</span> <span className='link'>On The Air</span>
                                    </Link>
                                    <Link href={'/search?type=tv&filter=popular'}>
                                        <span className='text-xs'>-</span> <span className='link'>Popular</span>
                                    </Link>
                                    <Link href={'/search?type=tv&filter=top-rated'}>
                                        <span className='text-xs'>-</span> <span className='link'>Top Rated</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    </nav>
  )
}