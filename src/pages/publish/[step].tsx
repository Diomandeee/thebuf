import React, { ReactElement } from 'react'
import Page from '@shared/Page'
import content from '../../../content/publish/index.json'
import router from 'next/router'

export default function PagePublish(): ReactElement {
  const { title } = content

  return (
    <Page title={title} description={title} uri={router.pathname}>
      <div className="container"></div>
    </Page>
  )
}
