import React, { ReactElement } from 'react'
import Page from '@shared/Page'
import { useRouter } from 'next/router'
// Import the Editor component as you have it defined.
import { Editor } from 'novel'

export default function PageHome(): ReactElement {
  const router = useRouter()
  const completionApi = 'src/novel/apps/web/app/api/generate'

  return (
    <Page uri={router.route}>
      <Editor completionApi={completionApi} />
    </Page>
  )
}
