import React from 'react'
import Head from 'next/head'
import Page from '@shared/Page'
import Button from '@shared/atoms/Button'
import { useRouter } from 'next/router'
import Image from 'next/image'
import CoffeeAndDance from '@images/coffee-and-dance.png'
import Step1 from '@images/1.png'
import Step2 from '@images/step_2.jpeg'
import Step3 from '@images/3.png'

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
            <Button
              style="primary"
              to="https://od3lfuetkam.typeform.com/to/T4fHQoQJ"
            >
              Get a Free Estimate
            </Button>
          </div>
          <div className="hero-image">
            <Image
              src={CoffeeAndDance}
              alt="Coffee and Dance"
              width={700}
              height={700}
            />
          </div>
        </section>

        <section className="benefits">
          <h2>Why Choose Buf Barista?</h2>
          <div className="benefit-list">
            <div className="benefit-item center">
              <h3>Increase Foot Traffic</h3>
              <p>
                Our custom espresso service draws more attendees to your booth,
                providing more opportunities for engagement.
              </p>
            </div>
            <div className="benefit-item center">
              <h3>Enhanced Brand Visibility</h3>
              <p>
                Cups featuring your logo and event branding serve as powerful
                marketing tools, enhancing brand recognition.
              </p>
            </div>
            <div className="benefit-item center">
              <h3>Memorable Experiences</h3>
              <p>
                Providing complimentary high-quality espresso drinks leaves a
                positive impression and makes your event stand out.
              </p>
            </div>
            <div className="benefit-item center">
              <h3>Bottomless Coffee</h3>
              <p>
                Keep attendees energized and engaged with unlimited coffee
                refills throughout the event.
              </p>
            </div>
          </div>
        </section>

        <section className="our-services">
          <h2>Our Services</h2>
          <div className="service-list">
            <div className="service-card center">
              <h3>Mobile Espresso Bars</h3>
              <p>
                Bring our mobile espresso bars to your event for a unique coffee
                experience.
              </p>
            </div>
            <div className="service-card center">
              <h3>Specialty Coffee Stations</h3>
              <p>
                Setup specialty coffee stations featuring a variety of brews and
                flavors.
              </p>
            </div>
            <div className="service-card center">
              <h3>Customized Beverage Menus</h3>
              <p>
                Create custom beverage menus tailored to your event and
                preferences.
              </p>
            </div>
          </div>
        </section>

        <section className="how-it-works">
          <h2>How It Works</h2>
          <div className="how-it-works-steps">
            <div className="step center">
              <Image src={Step1} alt="Contact Us" width={80} height={80} />
              <h3>1. Contact Us</h3>
              <p>Discuss your event details and requirements with us.</p>
            </div>
            <div className="step center">
              <Image src={Step2} alt="Custom Design" width={80} height={80} />
              <h3>2. Custom Design</h3>
              <p>
                We design and print custom coffee cups featuring your branding.
              </p>
            </div>
            <div className="step center">
              <Image src={Step3} alt="Setup & Serve" width={80} height={80} />
              <h3>3. Setup & Serve</h3>
              <p>
                Our professional baristas set up and serve premium espresso
                drinks at your event.
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
          <div className="button-group">
            <div>
              <Button
                style="primary"
                to="https://od3lfuetkam.typeform.com/to/T4fHQoQJ"
              >
                Get a Quote
              </Button>
            </div>
            <div style={{ marginTop: '10px' }}>
              <Button style="ghost" to="/faq">
                FAQ
              </Button>
            </div>
          </div>
        </section>
        <style>{`
  :root {
    --color-primary: #f5a623;
    --color-secondary: #b0bec5;
    --font-color-text: #41474e;
    --font-color-heading: #41474e;
    --background-body: #fcfcfc;
    --background-body-transparent: rgba(255, 255, 255, 0.8);
  }

  body {
    background-color: #b0bec5;
    font-family: 'Arial', sans-serif;
  }

  .hero,
  .benefits,
  .our-services,
  .how-it-works,
  .contact,
  .testimonials {
    padding: 40px;
    background-color: white;
    border-radius: 15px;
    margin-bottom: 40px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.8s ease, box-shadow 0.3s ease;
    animation: fadeIn 1s ease-in-out;
    border: 10px solid #f5f5f5;
  }

  .hero:hover,
  .benefits:hover,
  .our-services:hover,
  .how-it-works:hover,
  .contact:hover,
  .testimonials:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    border-color: #ccc; /* Add this line to change border color on hover */
  }

  .hero {
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation: fadeIn 1s ease-in-out;
  }

  .hero-content {
    flex: 1;
    max-width: 600px;
  }

  .hero-image {
    flex: 1;
    display: flex;
    justify-content: center;
    animation: float 2s ease-in-out infinite;
    margin-left: 40px;
  }

  .hero-image img {
    max-width: 100%;
    height: auto;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    animation: fadeInUp 1s ease-in-out;
  }

  .mobile-image {
    display: none;
  }

  .mobile-image img {
    max-width: 100%;
    height: auto;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    animation: fadeInUp 1s ease-in-out;
  }

  .headline {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-weight: bold;
    color: var(--font-color-heading);
    animation: slideInLeft 1s ease-in-out;
  }

  .subheadline {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: var(--color-secondary);
    animation: slideInRight 1s ease-in-out;
  }

  .intro {
    margin-bottom: 2rem;
    line-height: 1.6;
    color: var(--font-color-text);
    animation: fadeInUp 1s ease-in-out;
  }

  .benefit-list,
  .service-list,
  .how-it-works-steps,
  .testimonial-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    text-align: left;
  }

  .service-card h3,
  .step h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--color-secondary);
    animation: zoomIn 1s ease-in-out;
  }

  .benefit-item p,
  .service-card p,
  .step p {
    font-size: 1.2rem;
    line-height: 1.6;
    color: var(--font-color-text);
  }

  .center {
    text-align: center;
  }

  .benefit-item,
  .service-card,
  .step,
  .testimonial-item {
    flex: 1;
    min-width: 250px;
    background: var(--background-body-transparent);
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background-color: white;
    animation: fadeInUp 1s ease-in-out;
  }

  .faq {
    background-color: #fff;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-align: left;
    margin-bottom: 40px;
    border: 10px solid #f5f5f5;
    animation: fadeIn 1s ease-in-out;
  }

  .faq-heading {
    color: var(--font-color-heading);
    margin-bottom: 2rem;
    animation: slideInLeft 1s ease-in-out;
    text-align: center;
  }

  .benefit-item:hover,
  .service-card:hover,
  .step:hover,
  .testimonial-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  h3 {
    color: var(--color-secondary);
    margin-bottom: 1rem;
  }

  p {
    color: var(--font-color-text);
    line-height: 1.6;
  }

  .testimonial-item {
    font-style: italic;
  }

  .step img,
  .service-card img {
    display: block;
    margin: 0 auto 1rem;
  }

  .step h3,
  .service-card h3 {
    margin-bottom: 0.5rem;
  }

  .contact p {
    margin-bottom: 1.5rem;
  }

  .button-group {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    .button-group {
      flex-direction: row;
    }

    .hero {
      flex-direction: column;
      text-align: center;
    }

    .hero-content {
      margin-bottom: 2rem;
    }

    .hero-image {
      margin-left: 0;
    }

    .mobile-image {
      display: block;
      margin-top: 1rem;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes zoomIn {
    from {
      transform: scale(0);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`}</style>
      </Page>
    </>
  )
}
