"use client"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import React from 'react'

type Props = {
    baseUrl: string,
    pagination: Array<any>,
    total_pages: number,
    page: number,
    keyword?: string,
    type?: string | null,
    filter?: string | null,
    setPage: React.Dispatch<React.SetStateAction<number>>
}

export default function Pagination({baseUrl, pagination, total_pages, page, keyword, type, filter, setPage}: Props) {
  return (
    <ul className="mt-8 flex flex-wrap justify-center items-center gap-4">
        <li>
            <button
                onClick={() => {setPage(state => state + 1)}}
                // href={`${baseUrl}${ type ? `?type=${type}&filter=${filter}&` : '?' }page=${ page > 1 ? page - 1 : 1 }`}
            >
                <button className='button px-1.5 p-1 rounded-sm'>
                    <ChevronLeftIcon className='icon-size' />
                </button>
            </button>
        </li>
        {
            pagination.sort(function(a, b) {
                return a - b;
                }).map((value, index: number) => (
            <li key={index}>
                <Link href={`${baseUrl}${ type ? `?type=${type}&filter=${filter}&` : '?' }page=${value}`} className='button px-4 p-1.5 rounded-sm'>{ value }</Link>
            </li>
            ))
        }
        {
            ( total_pages > 9 && page <= 9 ) && (
            <li>
                <button
                    onClick={() => {setPage(state => state + 1)}}
                    // href={`${baseUrl}${ type ? `?type=${type}&filter=${filter}&` : '?' }page=${total_pages}`} className='button px-4 p-1.5 rounded-sm'
                >
                    { total_pages }
                </button>
            </li>
            )
        }
        <li>
            <button
                onClick={() => {setPage(state => state + 1)}}
                // href={`${baseUrl}${ type ? `?type=${type}&filter=${filter}&` : '?' }page=${page < total_pages ? page + 1 : 1}`}
            >
                <button className='button px-1.5 p-1 rounded-sm'>
                    <ChevronRightIcon className='icon-size' />
                </button>
            </button>
        </li>
    </ul>
  )
}