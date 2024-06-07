import React from 'react'
import Head from 'next/head'
import Page from '@shared/Page'
import Button from '@shared/atoms/Button'
import { useRouter } from 'next/router'
import Sleeves from '@images/sleeves.jpeg'
import Custom from '@images/branding.jpeg'
import Image from 'next/image'

export default function BrandingPage() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Custom Branding Services</title>
      </Head>

      <Page
        title="Custom Branding Services"
        description="Customize your event with branded items"
        uri={router.route}
        headerCenter
      >
        {/* Custom Branding Section */}
        <section className="section branding-section">
          <div className="branding-content">
            <h2>✨ CUSTOM BRANDING</h2>
            <p>
              Elevate your event with our custom branding services. Imagine
              attendees sipping on delicious espresso-based drinks with your
              company’s logo or event name proudly displayed on the cups.
            </p>
          </div>
          <div className="branding-image">
            <Image
              src={Custom}
              alt="Custom Branding"
              width={400}
              height={400}
            />
          </div>
        </section>

        {/* Drink Branding Section */}
        <section className="section drink-branding-section">
          <div className="drink-branding-content">
            <h2>🥤 DRINK BRANDING</h2>
            <p>
              Make every sip memorable with our drink branding service. Imagine
              your logo or special message floating on top of each drink as an
              edible, drinkable icing print.
            </p>
          </div>
          <div className="drink-branding-image">
            <Image
              src={Sleeves}
              alt="Drink Branding"
              width={400}
              height={400}
            />
          </div>
        </section>

        {/* Our Custom Branding Features Section */}
        <section className="section menu">
          <h2 className="section-title">🎨 Our Custom Branding Features</h2>

          {/* Cups Section */}
          <div className="menu-section">
            <h3 className="menu-section-title">☕ Cups</h3>
            <ul className="menu-list">
              <li>
                Customize your cups with your logo, picture, or special day
              </li>
            </ul>
          </div>

          {/* Napkins Section */}
          <div className="menu-section">
            <h3 className="menu-section-title">🍽️ Napkins</h3>
            <ul className="menu-list">
              <li>Keep your guests tidy with customized napkins</li>
            </ul>
          </div>

          {/* Sleeves Section */}
          <div className="menu-section">
            <h3 className="menu-section-title">🧣 Sleeves</h3>
            <ul className="menu-list">
              <li>
                Create custom sleeves for our cups with your logo, picture, or
                special day
              </li>
            </ul>
          </div>

          {/* Custom Items Section */}
          <div className="menu-section">
            <h3 className="menu-section-title">🔧 Custom Items</h3>
            <ul className="menu-list">
              <li>
                Give us your idea and we will do our very best to accommodate
                your needs!
              </li>
            </ul>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="section cta">
          <h2>🎉 Ready to Elevate Your Event?</h2>
          <Button style="primary" to="https://www.typeform.com">
            Get a Free Quote
          </Button>
        </section>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes slideIn {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
          }

          .menu {
            padding: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            animation: fadeIn 1s ease-in-out;
            background: white;
            border: 15px solid #f5f5f5;
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

          .menu-list {
            list-style-type: none;
            padding-left: 0;
            animation: fadeIn 1s ease-in-out;
          }

          .menu-list li {
            margin-bottom: 0.5rem;
            font-size: 1.2rem;
            line-height: 1.6;
            transition: color 0.3s ease, transform 0.3s ease;
          }

          .menu-list li:hover {
            color: #993300;
            transform: translateX(5px);
          }

          .expanded-menu {
            text-align: center;
            animation: fadeIn 1s ease-in-out;
          }

          .expanded-menu p {
            font-size: 1.2rem;
            line-height: 1.6;
            margin-bottom: 1.5rem;
          }

          .cta {
            text-align: center;
            margin-top: 40px;
            animation: fadeIn 1s ease-in-out;
          }

          .cta h2 {
            color: #663300;
          }

          .branding-section,
          .drink-branding-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            animation: fadeIn 1s ease-in-out;
            background: white;
            border: 15px solid #f5f5f5;
            border-radius: 16px;
            margin-bottom: 40px;
          }

          .branding-content,
          .drink-branding-content {
            max-width: 800px;
            text-align: center;
          }

          .branding-content h2,
          .drink-branding-content h2 {
            color: #663300;
          }

          .branding-content p,
          .drink-branding-content p {
            font-size: 1.2rem;
            line-height: 1.6;
            margin-bottom: 1.5rem;
          }

          .branding-image img,
          .drink-branding-image img {
            max-width: 100%;
            height: auto;
            border-radius: 15px;
          }

          .branding-image,
          .drink-branding-image {
            margin-top: 20px;
            max-width: 800px;
            animation: fadeIn 1s ease-in-out;
          }
        `}</style>
      </Page>
    </>
  )
}
