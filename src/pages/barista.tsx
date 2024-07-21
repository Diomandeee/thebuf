import React from 'react'
import Head from 'next/head'
import Page from '@shared/Page'
import Button from '@shared/atoms/Button'
import { useRouter } from 'next/router'
import Image from 'next/image'
import HireYourselfHero from '@images/coffee-and-dance.png'
import {
  FaCoffee,
  FaPiggyBank,
  FaGraduationCap,
  FaClock,
  FaLeaf,
  FaHome
} from 'react-icons/fa'

export default function HireYourselfBarista() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Hire Yourself as a Barista | Buf Barista</title>
      </Head>

      <Page
        title="Hire Yourself as a Barista"
        description="Invest in your coffee journey and become your own personal barista"
        uri={router.route}
        headerCenter
      >
        <section className="hero">
          <div className="hero-content">
            <h1 className="headline">Hire Yourself as a Barista</h1>
            <h2 className="subheadline">Invest in Your Coffee Journey</h2>
            <p className="intro">
              Why pay a coffee shop daily when you can invest in yourself? With
              Buf Barista premium subscription and top-quality equipment, you
              can become your own personal barista. Save money, gain skills, and
              enjoy cafe-quality coffee at home!
            </p>
            <Button
              style="primary"
              to="https://buf-barista.com/hire-yourself-subscription"
            >
              Start Your Barista Journey
            </Button>
          </div>
          <div className="hero-image">
            <Image
              src={HireYourselfHero}
              alt="Hire Yourself as a Barista"
              width={700}
              height={700}
            />
          </div>
        </section>

        <section className="features">
          <h2>Why Hire Yourself?</h2>
          <div className="feature-list">
            <div className="feature-item">
              <h3>Significant Savings</h3>
              <p>
                Save hundreds or even thousands per year compared to daily cafe
                visits.
              </p>
            </div>
            <div className="feature-item">
              <h3>Skill Development</h3>
              <p>
                Learn the art of coffee-making and impress friends and family.
              </p>
            </div>
            <div className="feature-item">
              <h3>Convenience</h3>
              <p>Enjoy cafe-quality coffee anytime, right in your own home.</p>
            </div>
            <div className="feature-item">
              <h3>Customization</h3>
              <p>Craft your perfect cup exactly to your taste preferences.</p>
            </div>
          </div>
        </section>

        <section className="subscription-tiers">
          <h2>Choose Your Barista Tier</h2>
          <div className="tier-list">
            <div className="tier">
              <h3>Starter Barista</h3>
              <p>Perfect for beginners</p>
              <ul>
                <li>Monthly coffee delivery</li>
                <li>Basic brewing guide</li>
                <li>Access to online tutorials</li>
              </ul>
              <p className="price">From $39/month</p>
              <Button
                style="primary"
                to="https://buf-barista.com/starter-barista"
              >
                Get Started
              </Button>
            </div>
            <div className="tier">
              <h3>Home Barista</h3>
              <p>For the enthusiastic learner</p>
              <ul>
                <li>Bi-weekly coffee delivery</li>
                <li>Advanced brewing techniques</li>
                <li>Monthly live online class</li>
              </ul>
              <p className="price">From $69/month</p>
              <Button style="primary" to="https://buf-barista.com/home-barista">
                Level Up
              </Button>
            </div>
            <div className="tier">
              <h3>Master Barista</h3>
              <p>For the coffee connoisseur</p>
              <ul>
                <li>Weekly rare coffee delivery</li>
                <li>Pro-level equipment training</li>
                <li>1-on-1 virtual coaching</li>
              </ul>
              <p className="price">From $119/month</p>
              <Button
                style="primary"
                to="https://buf-barista.com/master-barista"
              >
                Master Coffee
              </Button>
            </div>
          </div>
        </section>

        <section className="equipment">
          <h2>Professional-Grade Equipment</h2>
          <p>
            Pair your subscription with top-quality Breville espresso machines:
          </p>
          <div className="equipment-list">
            <div className="equipment-item">
              <h3>Breville Barista Express</h3>
              <p>Perfect for beginners and intermediate users</p>
              <p className="price">$549 or $23/month for 24 months</p>
            </div>
            <div className="equipment-item">
              <h3>Breville Barista Touch</h3>
              <p>Ideal for tech-savvy coffee lovers</p>
              <p className="price">$999 or $42/month for 24 months</p>
            </div>
            <div className="equipment-item">
              <h3>Breville Dual Boiler</h3>
              <p>For the serious home barista</p>
              <p className="price">$1,599 or $67/month for 24 months</p>
            </div>
          </div>
        </section>

        <section className="what-to-expect">
          <h2>What to Expect as Your Own Barista</h2>
          <div className="expect-grid">
            <div className="expect-item">
              <FaCoffee className="expect-icon" />
              <h3>Premium Coffee</h3>
              <p>
                Access to high-quality, freshly roasted beans delivered to your
                door
              </p>
            </div>
            <div className="expect-item">
              <FaPiggyBank className="expect-icon" />
              <h3>Cost Savings</h3>
              <p>
                Significant long-term savings compared to daily cafe purchases
              </p>
            </div>
            <div className="expect-item">
              <FaGraduationCap className="expect-icon" />
              <h3>Skill Development</h3>
              <p>
                Learn professional barista techniques through our comprehensive
                resources
              </p>
            </div>
            <div className="expect-item">
              <FaClock className="expect-icon" />
              <h3>Time Efficiency</h3>
              <p>No more waiting in long coffee shop lines</p>
            </div>
            <div className="expect-item">
              <FaLeaf className="expect-icon" />
              <h3>Eco-Friendly</h3>
              <p>
                Reduce waste from disposable cups and lower your carbon
                footprint
              </p>
            </div>
            <div className="expect-item">
              <FaHome className="expect-icon" />
              <h3>Home Cafe Experience</h3>
              <p>Transform your kitchen into your personal coffee haven</p>
            </div>
          </div>
        </section>

        <section className="cta">
          <h2>Ready to Hire Yourself?</h2>
          <p>Start your journey to becoming a home barista expert today!</p>
          <Button
            style="primary"
            to="https://buf-barista.com/hire-yourself-subscription"
          >
            Begin Your Coffee Adventure
          </Button>
        </section>

        <style>{`
          .hero,
          .features,
          .subscription-tiers,
          .equipment,
          .what-to-expect,
          .cta {
            padding: 40px;
            background-color: white;
            border-radius: 15px;
            margin-bottom: 40px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            animation: fadeIn 1s ease-in-out;
          }

          .hero {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: linear-gradient(135deg, #6f4e37 0%, #d2691e 100%);
            color: white;
          }
          h2 {
            color: #6f4e37;
            margin-bottom: 2rem;
            font-size: 2.2rem;
          }

          .hero-content {
            flex: 1;
            max-width: 600px;
          }

          .hero-image {
            flex: 1;
            display: flex;
            justify-content: center;
            animation: float 3s ease-in-out infinite;
          }

          .headline {
            font-size: 3.5rem;
            margin-bottom: 1rem;
            color: #ffd700;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          }

          .subheadline {
            font-size: 1.8rem;
            margin-bottom: 1.5rem;
            color: #fff8dc;
          }

          .intro {
            margin-bottom: 2rem;
            line-height: 1.6;
            font-size: 1.1rem;
          }

          .feature-list,
          .tier-list,
          .equipment-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
          }

          .feature-item,
          .tier,
          .equipment-item {
            flex: 1;
            min-width: 250px;
            padding: 20px;
            background-color: #fff8dc;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .feature-item:hover,
          .tier:hover,
          .equipment-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          h2 {
            color: #6f4e37;
            margin-bottom: 2rem;
            font-size: 2.2rem;
          }

          h3 {
            color: #d2691e;
            margin-bottom: 1rem;
          }

          p {
            color: #41474e;
            line-height: 1.6;
          }

          .price {
            font-weight: bold;
            color: #6f4e37;
            margin: 1rem 0;
          }

          .what-to-expect {
            background-color: #fff8dc;
            padding: 60px 40px;
          }

          .expect-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin-top: 40px;
          }

          .expect-item {
            background-color: white;
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .expect-item:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          }

          .expect-icon {
            font-size: 3rem;
            color: #d2691e;
            margin-bottom: 20px;
          }

          .expect-item h3 {
            color: #6f4e37;
            margin-bottom: 10px;
            font-size: 1.4rem;
          }

          .expect-item p {
            color: #41474e;
            font-size: 1rem;
            line-height: 1.5;
          }

          .cta {
            background: linear-gradient(135deg, #d2691e 0%, #6f4e37 100%);
            color: white;
          }

          @media (max-width: 768px) {
            .hero {
              flex-direction: column;
            }

            .hero-content {
              margin-bottom: 2rem;
            }

            .expect-grid {
              grid-template-columns: 1fr;
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

          @keyframes float {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}</style>
      </Page>
    </>
  )
}
