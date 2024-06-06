import React from 'react'
import Head from 'next/head'
import Page from '@shared/Page'
import Button from '@shared/atoms/Button'
import { useRouter } from 'next/router'

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
        <section className="section branding-section">
          <div className="branding-content">
            <h2>CUSTOM BRANDING</h2>
            <p>
              Elevate your event with our custom branding services. Imagine
              attendees sipping on delicious espresso-based drinks with your
              company’s logo or event name proudly displayed on the cups. Custom
              branding is not just for corporate events; it adds a personal
              touch to weddings, school reunions, and various other gatherings.
              We offer a range of branded products to suit your needs.
            </p>
          </div>
          <div className="branding-image">
            <img src="/images/branding.jpg" alt="Branding" />
          </div>
        </section>

        <section className="section drink-branding-section">
          <div className="drink-branding-content">
            <h2>DRINK BRANDING</h2>
            <p>
              Make every sip memorable with our drink branding service. Imagine
              your logo or special message floating on top of each drink as an
              edible, drinkable icing print. Whether you want to enhance your
              company image, promote a product, or add a personal touch to an
              event, our drink branders will make your beverages stand out.
            </p>
          </div>
          <div className="drink-branding-image">
            <img src="/images/drink-branding.jpg" alt="Drink Branding" />
          </div>
        </section>

        <section className="section menu">
          <h2 className="section-title">Our Custom Branding Features</h2>
          <div className="menu-section">
            <h3 className="menu-section-title">Cups</h3>
            <ul className="menu-list">
              <li>
                Customize your cups with your logo, picture, or special day
              </li>
            </ul>
          </div>

          <div className="menu-section">
            <h3 className="menu-section-title">Napkins</h3>
            <ul className="menu-list">
              <li>Keep your guests tidy with customized napkins</li>
            </ul>
          </div>
          <div className="menu-section">
            <h3 className="menu-section-title">Sleeves</h3>
            <ul className="menu-list">
              <li>
                Create custom sleeves for our cups with your logo, picture, or
                special day
              </li>
            </ul>
          </div>
          <div className="menu-section">
            <h3 className="menu-section-title">Custom Items</h3>
            <ul className="menu-list">
              <li>
                Give us your idea and we will do our very best to accommodate
                your needs!
              </li>
            </ul>
          </div>
        </section>

        <section className="section cta">
          <h2>Ready to Elevate Your Event?</h2>
          <Button style="primary" to="https://www.typeform.com">
            Get a Free Quote
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

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .section-title {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 2rem;
            color: #663300;
            position: relative;
            overflow: hidden;
            animation: fadeIn 1s ease-in-out;
          }

          .section-title::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 5px;
            bottom: 0;
            left: 0;
            background: #ffcc99;
            animation: slideIn 0.5s ease-out;
          }

          .menu {
            padding: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            animation: fadeIn 1s ease-in-out;
          }
          
          .menu-section {
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            width: auto;
            max-width: 800px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center; /* Center items horizontally */
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
            color: #663300;
            position: relative;
            overflow: hidden;
            animation: fadeIn 1s ease-in-out;
          }
          
          .menu-section-title::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 5px;
            bottom: 0;
            left: 0;
            background: #ffcc99;
            animation: slideIn 0.5s ease-out;
          }
          
          .menu-list {
            list-style-type: disc;
            margin-left: 20px;
          }
          

          .menu-section-title::before {
            position: absolute;
            width: 100%;
            height: 5px;
            bottom: 0;
            left: 0;
            background: #ffcc99;
            animation: slideIn 0.5s ease-out;
            }
            
            .menu-list {
                list-style-type: disc;
                margin-left: 20px;
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
              }
        
              .branding-content ul,
              .drink-branding-content ul {
                list-style-type: disc;
                margin-left: 20px;
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
        
              .branding-section,
              .drink-branding-section {
                margin-bottom: 40px;
                padding: 40px;
                background-color: white;
                border-radius: 15px;
                animation: fadeIn 1s ease-in-out;
              }
        
              .branding-section h2,
              .drink-branding-section h2 {
                color: #663300;
              }
            `}</style>
      </Page>
    </>
  )
}
