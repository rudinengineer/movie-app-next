import React from 'react'
import Search from '~/components/ui/Search'

type Props = {
    params: {
        keyword: string
    }
}

export default function page({params}: Props) {
  return (
    <Search keyword={params.keyword} />
  )
}