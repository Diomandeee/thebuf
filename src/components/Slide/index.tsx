import React, { ReactElement, useEffect, useState } from 'react'
import Bookmarks from './Bookmarks'
import { generateBaseQuery } from '@utils/aquarius'
import { useUserPreferences } from '@context/UserPreferences'
import { SortTermOptions } from '../../@types/aquarius/SearchQuery'
import TopTags from './TopTags'
import styles from './index.module.css'
export default function HomePage(): ReactElement {
  const { chainIds } = useUserPreferences()

  const [queryLatest, setQueryLatest] = useState<SearchQuery>()

  useEffect(() => {
    const baseParams = {
      chainIds,
      esPaginationOptions: {
        size: 9
      },
      sortOptions: {
        sortBy: SortTermOptions.Created
      } as SortOptions
    } as BaseQueryParams
    setQueryLatest(generateBaseQuery(baseParams))
  }, [chainIds])

  return (
    <>
      {/* <section className={styles.section}>
        <h3>Your Bookmarks</h3>
        <Bookmarks />
      </section> */}

      <div style={{ marginTop: '50px' }}>
        {' '}
        {/* Inline style for spacing */}
        <TopTags title="Categories" />
      </div>

      <div style={{ marginTop: '50px' }}> {/* Inline style for spacing */}</div>
    </>
  )
}
