"use client"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import React from 'react'

type Props = {
    pagination: Array<any>,
    total_pages: number,
    page: number,
    keyword?: string,
    type?: string | null,
    filter?: string | null
}

export default function Pagination({pagination, total_pages, page, keyword, type, filter}: Props) {
  return (
    <ul className="mt-8 flex flex-wrap justify-center items-center gap-4">
        <li>
            <Link href={`/search/${ type ? `?type=${type}&filter=${filter}&` : keyword + '?' }page=${ page > 1 ? page - 1 : 1 }`}>
            <button className='button px-1.5 p-1 rounded-sm'>
                <ChevronLeftIcon className='icon-size' />
            </button>
            </Link>
        </li>
        {
            pagination.sort(function(a, b) {
                return a - b;
                }).map((value, index: number) => (
            <li key={index}>
                <Link href={`/search/${ type ? `?type=${type}&filter=${filter}&` : keyword + '?' }page=${value}`} className='button px-4 p-1.5 rounded-sm'>{ value }</Link>
            </li>
            ))
        }
        {
            ( total_pages > 9 && page <= 9 ) && (
            <li>
                <Link href={`/search/${ type ? `?type=${type}&filter=${filter}&` : keyword + '?' }page=${total_pages}`} className='button px-4 p-1.5 rounded-sm'>{ total_pages }</Link>
            </li>
            )
        }
        <li>
            <Link href={`/search/${ type ? `?type=${type}&filter=${filter}&` : keyword + '?' }page=${page < total_pages ? page + 1 : 1}`}>
            <button className='button px-1.5 p-1 rounded-sm'>
                <ChevronRightIcon className='icon-size' />
            </button>
            </Link>
        </li>
    </ul>
  )
}