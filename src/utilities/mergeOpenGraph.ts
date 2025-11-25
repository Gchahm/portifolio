import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Senior Software Engineer with 7+ years building scalable systems, microservices, cloud architectures, and applications using .NET, React, Python.',
  images: [
    {
      url: `${getServerSideURL()}/avatar.jpg`,
      width: 1200,
      height: 630,
      alt: 'Profile Avatar',
    },
  ],
  siteName: 'Gustavo Francelino | Senior Software Engineer .NET and React',
  title: 'Gustavo Francelino | Senior Software Engineer .NET and React',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
