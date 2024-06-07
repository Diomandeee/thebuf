import React from 'react'
import Head from 'next/head'
import Page from '@shared/Page'
import Button from '@shared/atoms/Button'
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
        <section className="menu">
          <div className="menu-section">
            <div className="menu-section-title">Quality ☕️</div>
            <p>
              We source only the finest coffee beans from around the world,
              carefully selecting and roasting them to achieve the perfect
              balance of flavors and aromas.
            </p>
          </div>

          <div className="menu-section">
            <div className="menu-section-title">Customization 🎨</div>
            <p>
              At Buf Barista, we understand that every event is unique. That is
              why we offer custom branding and personalization options, allowing
              you to add your logo or custom design to our cups, creating a
              lasting impression for your guests.
            </p>
          </div>

          <div className="menu-section">
            <div className="menu-section-title">Professionalism 🎩</div>
            <p>
              We take pride in our team of seasoned and friendly baristas, who
              are committed to delivering exceptional customer service and
              creating a welcoming atmosphere.
            </p>
          </div>
          <div className="menu-section">
            <div className="menu-section-title">Convenience 🚚</div>
            <p>
              From setting up and managing the coffee bar to engaging with
              guests and providing expert recommendations, our team handles
              every aspect of the coffee service, enabling you to relax and
              enjoy your special event.
            </p>
          </div>

          <div className="menu-section">
            <div className="menu-section-title">Innovation 🚀</div>
            <p>
              Buf Barista is constantly innovating to bring you new and exciting
              coffee experiences. We are always exploring new ways to delight
              your taste buds and elevate your coffee experience.
            </p>
          </div>

          <div className="menu-section">
            <div className="menu-section-title">Community 🌍</div>
            <p>
              We believe in the power of coffee to bring people together and
              create connections.
            </p>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="section cta">
          <h2>🎉 Ready to Elevate Your Event?</h2>
          <Button style="primary" to="https://www.typeform.com">
            Get a Free Estimate
          </Button>
        </section>

        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .menu {
            padding: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            animation: fadeIn 1s ease-in-out;
            background: white;
            border: 10px solid #f5f5f5;
            border-radius: 16px;
          }

          .section-title {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 2rem;
            color: #333;
            overflow: hidden;
          }

          .menu-section {
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            width: 100%;
            max-width: 800px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            animation: fadeIn 1s ease-in-out;
            cursor: pointer;
            margin-bottom: 2rem;

          }

          .menu-section:hover {
            transform: translateY(-10px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
          }

          .menu-section-title {
            font-size: 1.8rem;
            margin-bottom: 1rem;
            color: #b0bec5;
          }

          .menu-section p {
            font-size: 1.3rem; /* Adjusted font size */
            line-height: 1.6;
          }

          .collapsed {
            display: none;
          }
          .cta {
            text-align: center;
            margin-top: 40px;
            animation: fadeIn 1s ease-in-out;
          }

          .cta h2 {
            color: #663300;
          }
          .expanded {
            display: block;
          }
        `}</style>
      </Page>
    </>
  )
}
