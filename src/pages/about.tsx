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
        <section className="timeline">
          <div className="event">
            <div className="event-year">2016</div>
            <div className="event-content">
              <h3>Mohamed's Culinary Journey Begins</h3>
              <p>
                Mohamed starts his culinary career, working in various food and
                beverage establishments, honing his skills and developing a
                passion for creating exceptional dining experiences.
              </p>
            </div>
          </div>
          <div className="event">
            <div className="event-year">2018</div>
            <div className="event-content">
              <h3>Recruitment Expertise</h3>
              <p>
                Mohamed gains experience in recruitment, specializing in finding
                the best baristas in the United States, ensuring Buf Barista's
                team is composed of top talent.
              </p>
            </div>
          </div>
          <div className="event">
            <div className="event-year">2024</div>
            <div className="event-content">
              <h3>Establishment of Buf Barista</h3>
              <p>
                At Buf Barista, we have been perfecting the art of coffee and
                event services since our establishment in 2024. Founded on the
                belief that special moments deserve exceptional coffee
                experiences, our dedicated team of skilled baristas has been
                serving top-quality, expertly crafted coffees to customers at
                events and special occasions across the region.
              </p>
            </div>
          </div>
          {/* Add more events here */}
        </section>

        <style jsx>{`
          .timeline {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
          }

          .event {
            display: flex;
            width: 80%;
            max-width: 800px;
            margin-bottom: 20px;
            border-left: 2px solid #663300;
            padding-left: 20px;
          }

          .event-year {
            font-size: 1.5rem;
            font-weight: bold;
            color: #663300;
            margin-right: 20px;
            padding-right: 20px;
            border-right: 2px solid #663300;
          }

          .event-content {
            flex: 1;
          }

          .event-content h3 {
            margin-top: 0;
            color: #663300;
          }

          .event-content p {
            margin-bottom: 0;
            color: #333;
          }

          .mission {
            padding: 20px;
            text-align: center;
          }

          .mission h2 {
            color: #663300;
          }
        `}</style>
      </Page>
    </>
  )
}
