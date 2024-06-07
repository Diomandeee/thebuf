import React from 'react'
import Head from 'next/head'
import Page from '@shared/Page'

import { useRouter } from 'next/router'

export default function AboutUsPage() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>About Us | Buf Barista</title>
      </Head>

      <Page
        title="Who Are We"
        description="Learn more about Buf Barista"
        uri={router.route}
        headerCenter
      >
        <section className="mission">
          <p>
            Our mission is to provide tailored and unforgettable coffee
            experiences for every event we serve. By combining the highest
            quality ingredients, state-of-the-art equipment, and exceptional
            baristas, we strive to deliver a memorable and enjoyable experience
            for you and your guests. We believe that our exceptional coffee
            offerings not only bring people together but create lasting
            memories.
          </p>
          <p>
            We take pride in our commitment to quality, personalization, and
            professionalism. From sourcing the finest coffee beans to offering
            custom branding options and providing top-notch customer service, we
            aim to exceed your expectations and make your event truly special.
          </p>
        </section>
        <section className="Characteristics">
          <div className="PUMPKIN SPICE PUMP-UP">
            <h3>Quality</h3>
            <p>
              We source only the finest coffee beans from around the world,
              carefully selecting and roasting them to achieve the perfect
              balance of flavors and aromas. Our team employs cutting-edge
              equipment and meticulous brewing techniques, ensuring the highest
              level of quality and consistency in every cup we serve. We are
              committed to providing a truly exceptional and unparalleled coffee
              experience.
            </p>
          </div>
          <div className="PECAN POWER PIE">
            <h3>Personalization</h3>
            <p>
              At Buf Barista, we understand that every event is unique. That`s
              why we offer custom branding and personalization options, allowing
              you to add your logo or custom design to our cups, creating a
              lasting impression for your guests.
            </p>
          </div>
          <div className="CINNA-SPIN & SWEAT">
            <h3>Professionalism</h3>
            <p>
              We take pride in our team of seasoned and friendly baristas, who
              are committed to delivering exceptional customer service and
              creating a welcoming atmosphere. From setting up and managing the
              coffee bar to engaging with guests and providing expert
              recommendations, our team handles every aspect of the coffee
              service, enabling you to relax and enjoy your special event.
            </p>
          </div>
        </section>

        <style>{`
          .qualities {
            display: flex;
            justify-content: space-around;
            padding: 20px;
          }

          .quality {
            flex: 1;
            padding: 20px;
            margin: 0 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          .quality h3 {
            color: #663300;
            margin-bottom: 10px;
          }

          .quality p {
            color: #333;
          }
        `}</style>
      </Page>
    </>
  )
}
