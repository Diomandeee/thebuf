import React from 'react'
import Head from 'next/head'
import Page from '@shared/Page'
import Button from '@shared/atoms/Button'
import { useRouter } from 'next/router'

export default function MenuPage() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Buf Barista Menu</title>
      </Head>

      <Page
        title="Buf Barista Menu"
        description="Explore our delicious espresso-based drinks"
        uri={router.route}
        headerCenter
      >
        {/* Menu Section */}
        <section className="menu">
          <h2 className="section-title">☕ Espresso-based Drinks</h2>

          {/* Dairy Options */}
          <div className="menu-section">
            <h3 className="menu-section-title">🥛 Dairy Options</h3>
            <ul className="menu-list">
              <li>Whole Milk</li>
              <li>Oat Milk</li>
              <li>Almond Milk</li>
            </ul>
          </div>

          {/* Tea Options */}
          <div className="menu-section">
            <h3 className="menu-section-title">🍵 Tea Options</h3>
            <ul className="menu-list">
              <li>Black Tea</li>
              <li>Green Tea</li>
              <li>Chai Tea</li>
            </ul>
          </div>

          {/* Syrup Options */}
          <div className="menu-section">
            <h3 className="menu-section-title">🍯 Syrup Options</h3>
            <ul className="menu-list">
              <li>Caramel</li>
              <li>Hazelnut</li>
              <li>Vanilla</li>
            </ul>
          </div>

          {/* Add-ons */}
          <div className="menu-section">
            <h3 className="menu-section-title">🍫 Add-ons</h3>
            <ul className="menu-list">
              <li>Whipped cream</li>
              <li>Chocolate drizzle</li>
              <li>Caramel drizzle</li>
            </ul>
          </div>

          {/* Expanded Menu */}
          <div className="menu-section expanded-menu">
            <h3 className="menu-section-title">📝 Expanded Menu</h3>
            <p>
              If you have a special request or dietary restriction, please let
              us know and we will do our best to accommodate you.
            </p>
            <Button style="primary" to="mailto:info@bufbarista.com">
              Contact Us for More Info
            </Button>
          </div>
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
        `}</style>
      </Page>
    </>
  )
}
