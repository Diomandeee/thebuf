import React from 'react'
import Head from 'next/head'
import Page from '@shared/Page'
import Accordion from 'src/components/Accordion'

export default function FaqPage() {
  const faqData = [
    {
      question: 'How can I Personalize my Event with Buf Barista?',
      answer:
        'You can personalize your event by having your logo and event branding printed on the coffee cups.'
    },
    {
      question: 'How soon should I book your services for my event?',
      answer:
        'We recommend booking our services at least 2 weeks in advance to ensure availability.'
    },
    {
      question: 'What is your service area?',
      answer:
        'We serve events in the Metro New York area, Los Angeles, San Francisco, Miami, and Chicago.'
    },
    {
      question: 'Do you provide everything needed for the coffee bar?',
      answer:
        'Yes, we provide everything needed for coffee bar: Baristas, Coffee Cart, Espresso machine, Grinder, Coffee, Syrups, coffee beans, milk, almond/oat milk, tea, sugar, sweeteners, cups, lids, water, tea, and ice.'
    },
    {
      question: 'How do you print the logo on the latte?',
      answer:
        'We use Drink Printer, that allows us to print any logos, text in seconds, names, photos on Milk/Oat Foam. All prints are printed using Natural coffee beans extract.'
    }
  ]

  return (
    <>
      <Head>
        <title>Buf Barista - FAQ</title>
      </Head>

      <Page
        title="Frequently Asked Questions"
        description="Buf Barista - Custom Coffee FAQ"
        uri="/faq"
        headerCenter
      >
        <section className="faq">
          <h2 className="faq-heading">Frequently Asked Questions</h2>
          <Accordion data={faqData} />
        </section>

        <style>{`
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

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
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
        `}</style>
      </Page>
    </>
  )
}
