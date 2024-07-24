import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Page from '@shared/Page'
import Button from '@shared/atoms/Button'
import { useRouter } from 'next/router'
import {
  FaCoffee,
  FaPiggyBank,
  FaGraduationCap,
  FaClock,
  FaLeaf,
  FaHome
} from 'react-icons/fa'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  TooltipProps
} from 'recharts'

const brevilleMachines = [
  { name: 'Breville Barista Express', price: 549, monthlyPayment: 23 },
  { name: 'Breville Barista Touch', price: 999, monthlyPayment: 42 },
  { name: 'Breville Dual Boiler', price: 1599, monthlyPayment: 67 }
]

const subscriptionTiers = [
  { name: 'Starter Barista', price: 51, bagsPerMonth: 3, cupsPerBag: 12 },
  { name: 'Home Barista', price: 72, bagsPerMonth: 4, cupsPerBag: 12 },
  { name: 'Master Barista', price: 114, bagsPerMonth: 6, cupsPerBag: 12 }
]

interface CalculationResults {
  monthlySavings: number
  monthlySavingsAfterFinancing: number
  yearlySavings: number
  breakEvenMonths: number
  fiveYearSavings: number
  lifetimeSavings: number
  annualROI: number
  cupsPerMonth: number
  additionalCoffeeShopVisits: number
}

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
  label
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">Year {label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: ${entry.value.toFixed(2)}
          </p>
        ))}
      </div>
    )
  }
  return null
}

function DetailedAnalysis({ data }) {
  return (
    <div className="detailed-analysis">
      <h4>Year {data.year} Breakdown</h4>
      <div className="analysis-grid">
        <div className="analysis-item">
          <h5>Coffee Shop Costs</h5>
          <p>${data['Coffee Shop'].toFixed(2)}</p>
        </div>
        <div className="analysis-item">
          <h5>Home Barista Costs</h5>
          <p>${data['Home Barista'].toFixed(2)}</p>
        </div>
        <div className="analysis-item">
          <h5>Cumulative Savings</h5>
          <p>${data['Cumulative Savings'].toFixed(2)}</p>
        </div>
        <div className="analysis-item">
          <h5>Yearly Savings</h5>
          <p>${(data['Coffee Shop'] - data['Home Barista']).toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

function SavingsCalculator() {
  const [dailySpend, setDailySpend] = useState(5)
  const [daysPerWeek, setDaysPerWeek] = useState(5)
  const [selectedMachine, setSelectedMachine] = useState(brevilleMachines[0])
  const [selectedTier, setSelectedTier] = useState(subscriptionTiers[0])
  const [financingMonths, setFinancingMonths] = useState(4)
  const [results, setResults] = useState<CalculationResults>({
    monthlySavings: 0,
    monthlySavingsAfterFinancing: 0,
    yearlySavings: 0,
    breakEvenMonths: 0,
    fiveYearSavings: 0,
    lifetimeSavings: 0,
    annualROI: 0,
    cupsPerMonth: 0,
    additionalCoffeeShopVisits: 0
  })
  const [chartData, setChartData] = useState([])
  const [activeTab, setActiveTab] = useState('savings')
  const [expandedDataPoint, setExpandedDataPoint] = useState(null)

  const calculateSavings = () => {
    const weeklySpend = dailySpend * daysPerWeek
    const monthlySpend = (weeklySpend * 52) / 12
    const yearlySpend = monthlySpend * 12

    const monthlySubscriptionCost = selectedTier.price
    const monthlyMachineCost = selectedMachine.price / financingMonths

    // Calculate how many cups of coffee the subscription provides per month
    const cupsPerMonth = selectedTier.bagsPerMonth * selectedTier.cupsPerBag

    // Calculate how many cups the user would typically consume per month
    const userCupsPerMonth = daysPerWeek * 4.33 // assuming 4.33 weeks per month

    // Calculate the cost of additional coffee shop visits if subscription doesn't cover all needs
    const additionalCoffeeShopVisits = Math.max(
      0,
      userCupsPerMonth - cupsPerMonth
    )
    const additionalCoffeeShopCost = additionalCoffeeShopVisits * dailySpend

    const totalMonthlyCost =
      monthlySubscriptionCost + monthlyMachineCost + additionalCoffeeShopCost
    const monthlySavings = monthlySpend - totalMonthlyCost
    const yearlySavings = monthlySavings * 12

    // Calculate monthly savings after financing
    const monthlySavingsAfterFinancing =
      monthlySpend - (monthlySubscriptionCost + additionalCoffeeShopCost)

    const breakEvenMonths = Math.ceil(selectedMachine.price / monthlySavings)
    const fiveYearSavings = yearlySavings * 5 - selectedMachine.price

    const lifetimeCoffeeShopCost = yearlySpend * 10
    const lifetimeHomeBaristaInvestment =
      selectedMachine.price +
      (monthlySubscriptionCost + additionalCoffeeShopCost) * 12 * 10
    const lifetimeSavings =
      lifetimeCoffeeShopCost - lifetimeHomeBaristaInvestment

    const annualROI =
      (yearlySavings / (selectedMachine.price + monthlySubscriptionCost * 12)) *
      100

    setResults({
      monthlySavings,
      monthlySavingsAfterFinancing,
      yearlySavings,
      breakEvenMonths,
      fiveYearSavings,
      lifetimeSavings,
      annualROI,
      cupsPerMonth,
      additionalCoffeeShopVisits
    })

    const data = []
    for (let year = 0; year <= 10; year++) {
      const coffeeShopCost = yearlySpend * year
      const homeBaristaInvestment =
        selectedMachine.price +
        (monthlySubscriptionCost + additionalCoffeeShopCost) * 12 * year
      const homeBaristaInvestmentWithMachineReplacement =
        homeBaristaInvestment + Math.floor(year / 5) * selectedMachine.price
      const cumulativeSavings =
        coffeeShopCost - homeBaristaInvestmentWithMachineReplacement
      const yearlyROI =
        year > 0
          ? ((coffeeShopCost - homeBaristaInvestmentWithMachineReplacement) /
              homeBaristaInvestmentWithMachineReplacement) *
            100
          : 0

      // Calculate monthly savings for each year, considering financing period
      const monthlyMachineCostForYear =
        year * 12 < financingMonths ? monthlyMachineCost : 0
      const monthlySavingsForYear =
        monthlySpend -
        (monthlySubscriptionCost +
          additionalCoffeeShopCost +
          monthlyMachineCostForYear)

      data.push({
        year,
        'Coffee Shop': coffeeShopCost,
        'Home Barista': homeBaristaInvestmentWithMachineReplacement,
        'Cumulative Savings': cumulativeSavings,
        'Yearly ROI': yearlyROI,
        'Monthly Savings': monthlySavingsForYear
      })
    }
    setChartData(data)
  }

  useEffect(() => {
    calculateSavings()
  }, [
    dailySpend,
    daysPerWeek,
    selectedMachine,
    selectedTier,
    financingMonths,
    calculateSavings
  ])
  const handleInputChange = (setter) => (e) => {
    const value =
      e.target.type === 'number' ? Number(e.target.value) : e.target.value
    setter(value)
  }

  return (
    <div className="calculator">
      <div className="calculator-content">
        <div className="input-section">
          <h3 className="section-title">Your Coffee Habits</h3>
          <div className="input-group">
            <label htmlFor="dailySpend">Average spend per coffee ($)</label>
            <div className="input-wrapper">
              <input
                type="range"
                id="dailySpend"
                min="1"
                max="20"
                step="0.5"
                value={dailySpend}
                onChange={handleInputChange(setDailySpend)}
              />
              <input
                type="number"
                value={dailySpend}
                onChange={handleInputChange(setDailySpend)}
                min="1"
                max="10"
                step="0.5"
              />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="daysPerWeek">Coffee days per week</label>
            <div className="input-wrapper">
              <input
                type="range"
                id="daysPerWeek"
                min="1"
                max="7"
                step="1"
                value={daysPerWeek}
                onChange={handleInputChange(setDaysPerWeek)}
              />
              <input
                type="number"
                value={daysPerWeek}
                onChange={handleInputChange(setDaysPerWeek)}
                min="1"
                max="7"
                step="1"
              />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="machine">Preferred Breville machine</label>
            <select
              id="machine"
              value={selectedMachine.name}
              onChange={(e) =>
                setSelectedMachine(
                  brevilleMachines.find((m) => m.name === e.target.value)
                )
              }
            >
              {brevilleMachines.map((machine) => (
                <option key={machine.name} value={machine.name}>
                  {machine.name} (${machine.price})
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="tier">Subscription Tier</label>
            <select
              id="tier"
              value={selectedTier.name}
              onChange={(e) =>
                setSelectedTier(
                  subscriptionTiers.find((t) => t.name === e.target.value)
                )
              }
            >
              {subscriptionTiers.map((tier) => (
                <option key={tier.name} value={tier.name}>
                  {tier.name} (${tier.price}/month, {tier.bagsPerMonth} bags)
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="financing">Financing period (months)</label>
            <div className="input-wrapper">
              <input
                type="range"
                id="financing"
                min="1"
                max="60"
                step="1"
                value={financingMonths}
                onChange={handleInputChange(setFinancingMonths)}
              />
              <input
                type="number"
                value={financingMonths}
                onChange={handleInputChange(setFinancingMonths)}
                min="1"
                max="60"
                step="1"
              />
            </div>
          </div>
        </div>
        <div className="results-section">
          <h3 className="section-title">Your Potential Savings</h3>
          <div className="results-grid">
            <div className="result-item">
              <h5>Monthly Savings</h5>
              <p>${results.monthlySavings?.toFixed(2)}</p>
            </div>
            <div className="result-item">
              <h5>Monthly Savings After Financing</h5>
              <p>${results.monthlySavingsAfterFinancing?.toFixed(2)}</p>
            </div>
            <div className="result-item">
              <h5>Yearly Savings</h5>
              <p>${results.yearlySavings?.toFixed(2)}</p>
            </div>
            <div className="result-item">
              <h5>Break-even Point</h5>
              <p>{results.breakEvenMonths} months</p>
            </div>
            <div className="result-item">
              <h5>5-Year Savings</h5>
              <p>${results.fiveYearSavings?.toFixed(2)}</p>
            </div>
          </div>
          <div className="long-term-benefits">
            <h5>Long-term Benefits</h5>
            <p>
              10-Year Lifetime Savings:{' '}
              <span>${results.lifetimeSavings?.toFixed(2)}</span>
            </p>
            <p>
              Annual Return on Investment:{' '}
              <span>{results.annualROI?.toFixed(2)}%</span>
            </p>
          </div>
          <div className="subscription-details">
            <h5>Subscription Details</h5>
            <p>
              Cups of coffee per month: <span>{results.cupsPerMonth}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="chart-section">
        <h3 className="section-title">Cost Comparison Over Time</h3>
        <div className="chart-tabs">
          <button
            onClick={() => setActiveTab('savings')}
            className={activeTab === 'savings' ? 'active' : ''}
          >
            Savings Over Time
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={activeTab === 'comparison' ? 'active' : ''}
          >
            Cost Comparison
          </button>
          <button
            onClick={() => setActiveTab('roi')}
            className={activeTab === 'roi' ? 'active' : ''}
          >
            Return on Investment
          </button>

          <button
            onClick={() => setActiveTab('monthlySavings')}
            className={activeTab === 'monthlySavings' ? 'active' : ''}
          >
            Monthly Savings
          </button>
        </div>
        <div className="chart">
          {activeTab === 'savings' && (
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="Cumulative Savings"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
          {activeTab === 'comparison' && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="Coffee Shop" stroke="#8884d8" />
                <Line type="monotone" dataKey="Home Barista" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          )}
          {activeTab === 'roi' && (
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="Yearly ROI"
                  stroke="#ffc658"
                  fill="#ffc658"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {activeTab === 'monthlySavings' && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Monthly Savings"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
        {expandedDataPoint && <DetailedAnalysis data={expandedDataPoint} />}
      </div>
      <style>{`
      .h2 {
        color: #fff8dc;
        margin-bottom: 1.5rem;
      }
      .calculator {
        background-color: #f8f9fa;
        padding: 40px;
        border-radius: 15px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        
        /* Centering styles */
        margin: 0 auto; /* This centers the element horizontally */
        max-width: 800px; /* Adjust max-width as per your design */
      }

        .calculator-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 40px;
        }

        .input-section,
        .results-section {
          flex: 1;
          min-width: 300px;
          background-color: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .section-title {
          font-size: 1.5rem;
          color: #4a5568;
          margin-bottom: 20px;
          text-align: center;
        }

        .input-group {
          margin-bottom: 25px;
        }

        .input-group label {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #4a5568;
          margin-bottom: 10px;
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .input-group input[type='range'] {
          flex: 1;
          -webkit-appearance: none;
          width: 100%;
          height: 5px;
          border-radius: 5px;
          background: #d1d5db;
          outline: none;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .input-group input[type='range']:hover {
          opacity: 1;
        }

        .input-group input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #6f4e37;
          cursor: pointer;
        }
        .input-group.large-select select {
          width: 100%;
          padding: 12px;
          font-size: 16px;
          border: 2px solid #d1d5db;
          border-radius: 50%;
          background-color: white;
          color: #4a5568;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .input-group.large-select select:hover,
        .input-group.large-select select:focus {
          border-color: #6f4e37;
          box-shadow: 0 0 0 2px rgba(111, 78, 55, 0.2);
          border-radius: 50%;
        }

        .input-group.large-select label {
          font-size: 1.1rem;
          margin-bottom: 8px;
          color: #2d3748;
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .result-item {
          background-color: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .result-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .result-item h5 {
          color: #4a5568;
          margin-bottom: 10px;
          font-size: 1.1rem;
        }

        .result-item p {
          color: #6f4e37;
          font-size: 1.4rem;
          font-weight: bold;
        }

        .long-term-benefits,
        .environmental-impact,
        .subscription-details {
          margin-top: 30px;
          background-color: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .long-term-benefits,
        .subscription-details {
          margin-top: 30px;
          background-color: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .long-term-benefits h5,
        .subscription-details h5 {
          color: #4a5568;
          margin-bottom: 15px;
          font-size: 1.2rem;
          text-align: center; /* Center the h5 tags */
        }

        .long-term-benefits p,
        .subscription-details p {
          color: #4a5568;
          margin-bottom: 10px;
        }

        .long-term-benefits span,
        .subscription-details span {
          font-weight: bold;
          color: #6f4e37;
        }
        .chart-section {
          margin-top: 40px;
          background-color: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .chart-tabs {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .chart-tabs button {
          background-color: #f8f9fa;
          border: none;
          padding: 10px 20px;
          margin: 5px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease;
          color: #4a5568;
        }

        .chart-tabs button.active {
          background-color: #6f4e37;
          color: white;
        }

        .chart {
          background-color: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .custom-tooltip {
          background-color: rgba(255, 255, 255, 0.9);
          border: 1px solid #d1d5db;
          padding: 15px;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .custom-tooltip .label {
          font-weight: bold;
          margin-bottom: 10px;
          color: #4a5568;
        }

        @media (max-width: 768px) {
          .calculator-content {
            flex-direction: column;
          }

          .input-section,
          .results-section {
            width: 100%;
          }

          .chart-tabs {
            flex-direction: column;
          }

          .chart-tabs button {
            width: 100%;
            margin: 5px 0;
          }
        }
      `}</style>
    </div>
  )
}

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
        <section className="calculator-section">
          <SavingsCalculator />
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

          <div className="equipment-list">
            <div className="equipment-item">
              <h3>Breville Barista Express</h3>
              <p>Perfect for beginners</p>
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
            color: #fff8dc;
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
          .calculator-section,
          .cta {
            padding: 60px 40px;
            background-color: white;
            border-radius: 15px;
            margin-bottom: 40px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            animation: fadeIn 1s ease-in-out;
          }

          .cta {
            background: linear-gradient(135deg, #d2691e 0%, #6f4e37 100%);
            color: white;
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
