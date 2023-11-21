import React from 'react'
import Head from 'next/head'
import Page from '@shared/Page'
import Button from '@shared/atoms/Button'
import { useRouter } from 'next/router'
import { useMarketMetadata } from '@context/MarketMetadata'

export default function IndexPage() {
  const router = useRouter()
  const { siteContent } = useMarketMetadata()

  const title = 'Meaning Full Power'

  const bookThemes = []
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Page
        title={title}
        description={siteContent?.siteTagline}
        uri={router.route}
        headerCenter
      >
        <iframe
          title="Meaning Full Power"
          src="https://www.synergetic.life"
          width="100%"
          height="800"
          frameBorder="0"
          allowFullScreen
        ></iframe>

        {bookThemes.map((theme) => (
          <section
            key={theme.title}
            className="theme-section"
            style={{ textAlign: 'center' }}
          >
            <h2>{theme.title}</h2>
            <p>{theme.description}</p>
          </section>
        ))}
        <div
          className="call-to-action"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Button
            style="primary"
            to="https://www.amazon.com/Meaning-Full-Power-Harnessing-Potential/dp/B098HSP8Q9"
          >
            Explore the Book on Amazon
          </Button>
        </div>
      </Page>
    </>
  )
}
