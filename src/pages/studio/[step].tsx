import React, { ReactElement } from 'react'
import Explore from '../../components/Explore'
import Page from '@shared/Page'
import content from '../../../content/publish/index.json'
import router from 'next/router'

export default function PageExplore(): ReactElement {
  const { title, description } = content

  return (
    <Page
      title={title}
      description={description}
      uri={router.route}
      noPageHeader
    >
      <Explore />
    </Page>
  )
}
