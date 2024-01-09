import React from 'react'
import Head from 'next/head'
import Page from '@shared/Page'
import Button from '@shared/atoms/Button'
import { useRouter } from 'next/router'
import { useMarketMetadata } from '@context/MarketMetadata'

export default function IndexPage() {
  const router = useRouter()
  const { siteContent } = useMarketMetadata()

  const title = ''

  const bookThemes = []
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Page
        title={siteContent?.siteTitle}
        description={siteContent?.siteTagline}
        uri={router.route}
        headerCenter
      >
        <div
          className="hero"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px' // Adjust the margin as needed
          }}
        >
          <Button
            style="primary"
            to="https://www.amazon.com/Meaning-Full-Power-Harnessing-Potential/dp/B098HSP8Q9"
          >
            Explore the Book on Amazon
          </Button>
        </div>
        <iframe
          title="Meaning Full Power"
          src="https://www.synergetic.life"
          width="100%"
          height="1500"
          frameBorder="20"
          allowFullScreen
          style={{ borderRadius: '20px' }}
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
      </Page>
    </>
  )
}
