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
          <h2 className="section-title">Espresso-based Drinks</h2>

          {/* Dairy Options */}
          <div className="menu-section">
            <h3 className="menu-section-title">Dairy Options</h3>
            <ul className="menu-list">
              <li>Whole Milk</li>
              <li>Fat Free Milk</li>
              <li>Soy Milk</li>
              <li>Almond Milk</li>
            </ul>
          </div>

          {/* Syrup Options */}
          <div className="menu-section">
            <h3 className="menu-section-title">Syrup Options</h3>
            <ul className="menu-list">
              <li>Caramel</li>
              <li>Hazelnut</li>
              <li>Vanilla</li>
              <li>Sugar-free syrup of your choice</li>
            </ul>
          </div>

          {/* Sweetener Options */}
          <div className="menu-section">
            <h3 className="menu-section-title">Sweetener Options</h3>
            <ul className="menu-list">
              <li>White Sugar</li>
              <li>Raw Sugar</li>
              <li>Stevia</li>
              <li>Sweet N Low</li>
            </ul>
          </div>

          {/* Specialties */}
          <div className="menu-section">
            <h3 className="menu-section-title">Specialties</h3>
            <ul className="menu-list">
              <li>
                <strong>Buf Brew</strong> - Our signature blend of espresso with
                your choice of dairy and syrup, sweetened to perfection.
              </li>
              <li>
                <strong>Bufaccino</strong> - A creamy blend of espresso, milk,
                and your choice of syrup, topped with frothed milk.
              </li>
              <li>
                <strong>Buf Latte</strong> - A classic latte with a shot of
                espresso and steamed milk, available with any of our syrups.
              </li>
              <li>
                <strong>Buf Mocha</strong> - Espresso mixed with rich chocolate
                syrup and steamed milk, topped with whipped cream.
              </li>
            </ul>
          </div>

          {/* Add-ons */}
          <div className="menu-section">
            <h3 className="menu-section-title">Add-ons</h3>
            <ul className="menu-list">
              <li>Extra shot of espresso</li>
              <li>Whipped cream</li>
              <li>Chocolate drizzle</li>
              <li>Caramel drizzle</li>
              <li>Extra syrup</li>
            </ul>
          </div>

          {/* Expanded Menu */}
          <div className="menu-section expanded-menu">
            <h3 className="menu-section-title">Expanded Menu</h3>
            <p>
              Our menu is not limited to the items listed above. We offer a wide
              variety of espresso-based drinks, teas, and other beverages to
              suit your tastes. If you have a special request or dietary
              restriction, please let us know and we will do our best to
              accommodate you.
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
          }

          .section-title {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 2rem;
            color: #663300;
            position: relative;
            overflow: hidden;
          }

          .section-title::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 5px;
            bottom: 0;
            left: 0;
            background: #ffcc99;
            animation: slideIn 0.5s ease-out;
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
            color: #663300;
            position: relative;
            overflow: hidden;
          }

          .menu-section-title::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 5px;
            bottom: 0;
            left: 0;
            background: #ffcc99;
            animation: slideIn 0.5s ease-out;
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
