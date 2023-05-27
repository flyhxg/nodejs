import { NextPage } from 'next'

export interface MetaProps {
  title: string
  keywords: string
  description: string
  image: string
}

export type PageFC<T = {}> = NextPage<T> & { meta?: MetaProps }
