import React from 'react'
import Head from 'next/head'
import Page from '@shared/Page'
import Button from '@shared/atoms/Button'
import { useRouter } from 'next/router'
import Image from 'next/image'
import CoffeeAndDance from '@images/coffee-and-dance.png'
import Step1 from '@images/step_1.jpeg'
import Step2 from '@images/step_2.jpeg'
import Step3 from '@images/step_3.jpeg'
import Step4 from '@images/step_4.jpeg'

export default function IndexPage() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Boost Your Event with Buf Barista</title>
      </Head>

      <Page
        title="Boost Your Event with Buf Barista"
        description="Custom Coffee for Trade Shows & Conventions"
        uri={router.route}
        headerCenter
      >
        <section className="hero">
          <div className="hero-content">
            <h1 className="headline">Coffee that Celebrates Your Event</h1>
            <h2 className="subheadline">
              Personalized Coffee Service for Trade Shows & Conventions
            </h2>
            <p className="intro">
              Elevate your event with our custom coffee service. We brew premium
              coffee served in cups featuring your event branding, creating a
              unique and memorable experience for your attendees.
            </p>
            <Button style="primary" to="https://www.typeform.com">
              Get a Free Quote
            </Button>
          </div>
          <div className="hero-image">
            <Image
              src={CoffeeAndDance}
              alt="Coffee and Dance"
              width={500}
              height={500}
            />
          </div>
        </section>

        <section className="benefits">
          <h2>Why Choose Buf Barista?</h2>
          <div className="benefit-list">
            <div className="benefit-item">
              <h3>Increase Foot Traffic</h3>
              <p>
                Our custom espresso service draws more attendees to your booth,
                providing more opportunities for engagement.
              </p>
            </div>
            <div className="benefit-item">
              <h3>Enhanced Brand Visibility</h3>
              <p>
                Cups featuring your logo and event branding serve as powerful
                marketing tools, enhancing brand recognition.
              </p>
            </div>
            <div className="benefit-item">
              <h3>Memorable Experiences</h3>
              <p>
                Providing complimentary high-quality espresso drinks leaves a
                positive impression and makes your event stand out.
              </p>
            </div>
          </div>
        </section>

        {/* Our Services Section */}
        <section className="our-services">
          <h2>Our Services</h2>
          <div className="service-list">
            <div className="service-card">
              <h3>Mobile Espresso Bars</h3>
              <p>
                Bring our mobile espresso bars to your event for a unique coffee
                experience.
              </p>
            </div>
            <div className="service-card">
              <h3>Specialty Coffee Stations</h3>
              <p>
                Setup specialty coffee stations featuring a variety of brews and
                flavors.
              </p>
            </div>
            <div className="service-card">
              <h3>Customized Beverage Menus</h3>
              <p>
                Create custom beverage menus tailored to your event and
                preferences.
              </p>
            </div>
            <div className="service-card">
              <h3>Barista Staffing and Training</h3>
              <p>
                Hire our professional baristas for your event and receive expert
                training.
              </p>
            </div>
          </div>
        </section>

        <section className="how-it-works">
          <h2>How It Works</h2>
          <div className="how-it-works-steps">
            <div className="step">
              <Image src={Step1} alt="Contact Us" width={80} height={80} />
              <h3>1. Contact Us</h3>
              <p>Discuss your event details and requirements with us.</p>
            </div>
            <div className="step">
              <Image src={Step2} alt="Custom Design" width={80} height={80} />
              <h3>2. Custom Design</h3>
              <p>
                We design and print custom coffee cups featuring your branding.
              </p>
            </div>
            <div className="step">
              <Image src={Step3} alt="Setup & Serve" width={80} height={80} />
              <h3>3. Setup & Serve</h3>
              <p>
                Our professional baristas set up and serve premium espresso
                drinks at your event.
              </p>
            </div>
            <div className="step">
              <Image src={Step4} alt="Engage & Enjoy" width={80} height={80} />
              <h3>4. Engage & Enjoy</h3>
              <p>
                Engage with attendees as they enjoy complimentary coffee,
                boosting foot traffic and visibility.
              </p>
            </div>
          </div>
        </section>

        <section className="contact">
          <h2>Contact Us</h2>
          <p>
            Ready to boost your event with Buf Barista? Get in touch with us
            today for a free quote!
          </p>
          <Button style="primary" to="https://www.typeform.com">
            Get a Free Quote
          </Button>
        </section>

        <style>{`
          /* Define CSS-in-JS styles */
          .hero {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 40px;
          }

          .hero-content {
            flex: 1;
            max-width: 600px;
          }

          .headline {
            font-size: 3rem;
            margin-bottom: 1rem;
            font-weight: bold;
          }

          .subheadline {
            font-size: 1.8rem;
            margin-bottom: 1.5rem;
            color: #663300;
          }

          .intro {
            margin-bottom: 2rem;
            line-height: 1.6;
          }

          .benefits {
            padding: 40px;
          }

          .benefit-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            grid-gap: 20px;
            margin-top: 40px;
          }

          .benefit-item {
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .benefit-item:hover {
            transform: translateY(-10px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
          }

          .benefit-item h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #663300;
          }

          .benefit-item p {
            font-size: 1.2rem;
            line-height: 1.6;
          }

          .our-services {
            padding: 40px;
          }

          .service-list {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 20px;
            margin-top: 40px;
          }

          .service-card {
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .service-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
          }

          .service-card h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #663300;
          }

          .service-card p {
            font-size: 1.2rem;
            line-height: 1.6;
          }

          .how-it-works {
            padding: 40px;
            
          }

          .how-it-works-steps {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            grid-gap: 20px;
            justify-content: space-around;
            align-items: stretch; /* Ensure all items stretch to match height */
          }

          .step {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 16px;
            margin: 10px;
            transition: transform 0.3s ease;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            background-color: #fff;
            display: flex;
            flex-direction: column;
          }

          .step:hover {
            transform: translateY(-10px);
          }

          .step h3 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            color: #663300;
          }

          .step p {
            font-size: 1.2rem;
            line-height: 1.6;
            flex-grow: 1; /* Allow the text to take up remaining space */
          }


          .step:hover {
            transform: translateY(-10px);
          }

          .additional-services {
            background-color: #f5f5f5;
            padding: 40px;
          }

          .contact {
            background-color #f5f5f5;
            padding: 40px;
            text-align: center;
          }

          .contact p {
            margin-bottom: 2rem;
            text-align: center;
          }

          .contact button {
            margin: 0 auto;
            display: block;
          }
        `}</style>
      </Page>
    </>
  )
}
