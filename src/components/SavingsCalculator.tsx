// import React, { useState, useEffect, useCallback } from 'react'
// import Head from 'next/head'
// import Page from '@shared/Page'
// import Button from '@shared/atoms/Button'
// import { useRouter } from 'next/router'
// import { motion } from 'framer-motion'
// import {
//   FaCoffee,
//   FaPiggyBank,
//   FaGraduationCap,
//   FaClock,
//   FaLeaf,
//   FaHome,
//   FaCog,
//   FaCalendarCheck
// } from 'react-icons/fa'
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   RadarChart,
//   Radar,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis
// } from 'recharts'

// const brevilleMachines = [
//   { name: 'Breville Barista Express', price: 549, monthlyPayment: 23 },
//   { name: 'Breville Barista Touch', price: 999, monthlyPayment: 42 },
//   { name: 'Breville Dual Boiler', price: 1599, monthlyPayment: 67 }
// ]

// const subscriptionTiers = [
//   { name: 'Starter Barista', price: 51, bagsPerMonth: 3, cupsPerBag: 12 },
//   { name: 'Home Barista', price: 72, bagsPerMonth: 4, cupsPerBag: 12 },
//   { name: 'Master Barista', price: 114, bagsPerMonth: 6, cupsPerBag: 12 }
// ]

// const milkOptions = [
//   { value: 'none', label: 'No milk subscription' },
//   {
//     value: 'single',
//     label: 'Single Subscription (6 units, 32oz each, $49.37)'
//   },
//   {
//     value: 'double',
//     label: 'Double Subscription (12 units, 32oz each, $89.00)'
//   }
// ]

// interface CalculationResults {
//   monthlySavings: number
//   monthlySavingsAfterFinancing: number
//   yearlySavings: number
//   breakEvenMonths: number
//   fiveYearSavings: number
//   lifetimeSavings: number
//   annualROI: number
//   cupsPerMonth: number
//   additionalCoffeeShopVisits: number
//   monthlyMilkCost: number
//   dailyHomeBaristaTotal: number
//   coffeeAdventureIndex: number
//   fiveYearTotalCost: number
//   averageCostPerCup: number
// }

// const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="custom-tooltip">
//         <p className="label">Year {label}</p>
//         <ul>
//           {payload.map((item) => (
//             <li key={item.dataKey}>
//               {item.dataKey}: ${item.value.toFixed(2)}
//             </li>
//           ))}
//         </ul>
//       </div>
//     )
//   }
//   return null
// }

// function SavingsCalculator() {
//   const [dailySpend, setDailySpend] = useState(7)
//   const [daysPerWeek, setDaysPerWeek] = useState(7)
//   const [selectedMachine, setSelectedMachine] = useState(brevilleMachines[0])
//   const [selectedTier, setSelectedTier] = useState(subscriptionTiers[0])
//   const [financingMonths, setFinancingMonths] = useState(20)
//   const [milkDeliveryFrequency, setMilkDeliveryFrequency] = useState(28)
//   const [selectedMilk, setSelectedMilk] = useState('none')
//   const [isDonation, setIsDonation] = useState(false)
//   const [results, setResults] = useState<CalculationResults>({
//     monthlySavings: 0,
//     monthlySavingsAfterFinancing: 0,
//     yearlySavings: 0,
//     breakEvenMonths: 0,
//     fiveYearSavings: 0,
//     lifetimeSavings: 0,
//     annualROI: 0,
//     cupsPerMonth: 0,
//     additionalCoffeeShopVisits: 0,
//     monthlyMilkCost: 0,
//     dailyHomeBaristaTotal: 0,
//     coffeeAdventureIndex: 0,
//     fiveYearTotalCost: 0,
//     averageCostPerCup: 0
//   })
//   const [chartData, setChartData] = useState([])
//   const [activeTab, setActiveTab] = useState('savings')
//   const [warningMessage, setWarningMessage] = useState('')
//   const [totalCostComparison, setTotalCostComparison] = useState([])
//   const [coffeeAdventureDetails, setCoffeeAdventureDetails] = useState({
//     variety: 0,
//     technique: 0,
//     sustainability: 0,
//     savings: 0,
//     consistency: 0
//   })

//   function IRR(cashFlows, guess = 0.1) {
//     const maxIterations = 1000
//     const tolerance = 1e-6

//     for (let i = 0; i < maxIterations; i++) {
//       const npv = cashFlows.reduce(
//         (sum, cashFlow, t) => sum + cashFlow / Math.pow(1 + guess, t),
//         0
//       )
//       if (Math.abs(npv) < tolerance) {
//         return guess
//       }
//       const derivativeNPV = cashFlows.reduce(
//         (sum, cashFlow, t) => sum - (t * cashFlow) / Math.pow(1 + guess, t + 1),
//         0
//       )
//       const nextGuess = guess - npv / derivativeNPV
//       if (Math.abs(nextGuess - guess) < tolerance) {
//         return nextGuess
//       }
//       guess = nextGuess
//     }
//     return null
//   }

//   const calculateSavings = useCallback(() => {
//     const inflationRate = 0.02
//     const annualMaintenanceCost = 50
//     const machineLifespan = 5

//     const weeklySpend = dailySpend * daysPerWeek
//     const monthlySpend = (weeklySpend * 52) / 12
//     const yearlySpend = monthlySpend * 12

//     const monthlySubscriptionCost = selectedTier.price

//     const annualInterestRate = 0.05
//     const monthlyInterestRate = annualInterestRate / 12
//     const monthlyMachineCost =
//       (selectedMachine.price *
//         monthlyInterestRate *
//         Math.pow(1 + monthlyInterestRate, financingMonths)) /
//       (Math.pow(1 + monthlyInterestRate, financingMonths) - 1)

//     const cupsPerMonth = selectedTier.bagsPerMonth * selectedTier.cupsPerBag

//     const averageDaysPerMonth = 365.25 / 12
//     const userCupsPerMonth = daysPerWeek * (averageDaysPerMonth / 7)

//     const additionalCoffeeShopVisits = Math.max(
//       0,
//       userCupsPerMonth - cupsPerMonth
//     )
//     const additionalCoffeeShopCost = additionalCoffeeShopVisits * dailySpend

//     let monthlyMilkCost = 0
//     if (selectedMilk === 'single') {
//       monthlyMilkCost = (49.37 / milkDeliveryFrequency) * 30
//     } else if (selectedMilk === 'double') {
//       monthlyMilkCost = (89.0 / milkDeliveryFrequency) * 30
//     }

//     const totalMonthlyCost =
//       monthlySubscriptionCost +
//       monthlyMachineCost +
//       additionalCoffeeShopCost +
//       annualMaintenanceCost / 12 +
//       monthlyMilkCost

//     const monthlySavings = monthlySpend - totalMonthlyCost
//     const yearlySavings = monthlySavings * 12

//     const monthlySavingsAfterFinancing = Math.max(
//       0,
//       monthlySpend -
//         (monthlySubscriptionCost +
//           additionalCoffeeShopCost +
//           annualMaintenanceCost / 12 +
//           monthlyMilkCost)
//     )

//     const breakEvenMonths =
//       monthlySavings > 0
//         ? Math.ceil(selectedMachine.price / monthlySavings)
//         : Infinity

//     let fiveYearSavings = 0
//     let inflatedYearlySpend = yearlySpend
//     let inflatedYearlySavings = yearlySavings
//     for (let year = 1; year <= 5; year++) {
//       fiveYearSavings += inflatedYearlySavings
//       inflatedYearlySpend *= 1 + inflationRate
//       inflatedYearlySavings = (inflatedYearlySpend / 12 - totalMonthlyCost) * 12
//     }
//     fiveYearSavings -= selectedMachine.price

//     let lifetimeSavings = 0
//     inflatedYearlySpend = yearlySpend
//     inflatedYearlySavings = yearlySavings
//     for (let year = 1; year <= 10; year++) {
//       if (year % machineLifespan === 0) {
//         lifetimeSavings -= selectedMachine.price
//       }
//       lifetimeSavings += inflatedYearlySavings
//       lifetimeSavings -=
//         monthlySubscriptionCost * 12 +
//         additionalCoffeeShopCost * 12 +
//         annualMaintenanceCost +
//         monthlyMilkCost * 12
//       inflatedYearlySpend *= 1 + inflationRate
//       inflatedYearlySavings = (inflatedYearlySpend / 12 - totalMonthlyCost) * 12
//     }

//     const cashFlows = [-selectedMachine.price]
//     for (let i = 1; i <= 5; i++) {
//       cashFlows.push(yearlySavings * Math.pow(1 + inflationRate, i - 1))
//     }
//     const annualROI = IRR(cashFlows) * 100

//     // Calculate daily cost for home barista
//     const daysInMonth = 30.44 // average number of days in a month
//     const cupsPerDay = cupsPerMonth / daysInMonth
//     const dailyCoffeeCost = monthlySubscriptionCost / daysInMonth / cupsPerDay

//     let dailyMilkCost = 0
//     if (selectedMilk === 'single') {
//       dailyMilkCost = 49.37 / milkDeliveryFrequency
//     } else if (selectedMilk === 'double') {
//       dailyMilkCost = 89.0 / milkDeliveryFrequency
//     }

//     const dailyHomeBaristaTotal = dailyCoffeeCost + dailyMilkCost

//     // Calculate the total cost of ownership for 5 years
//     const fiveYearTotalCost =
//       selectedMachine.price +
//       monthlySubscriptionCost * 12 * 5 +
//       additionalCoffeeShopCost * 12 * 5 +
//       annualMaintenanceCost * 5 +
//       monthlyMilkCost * 12 * 5

//     // Calculate the average cost per cup over 5 years
//     const totalCupsOver5Years = cupsPerMonth * 12 * 5
//     const averageCostPerCup = fiveYearTotalCost / totalCupsOver5Years

//     // Calculate the Coffee Adventure Index (CAI)
//     const coffeeShopVisits = (365 * daysPerWeek) / 7 // Yearly coffee shop visits
//     const homeCoffeeBrews = cupsPerMonth * 12 // Yearly home brews
//     const varietyScore = selectedTier.bagsPerMonth * 10 // 0-60
//     const techniqueScore = (selectedMachine.price / 2000) * 100 // 0-100 based on machine sophistication
//     const sustainabilityScore =
//       (1 - additionalCoffeeShopVisits / coffeeShopVisits) * 100 // 0-100
//     const savingsScore =
//       fiveYearSavings > 0 ? (fiveYearSavings / 10000) * 100 : 0 // 0-100, maxes at $10,000 savings
//     const consistencyScore = (cupsPerMonth / 100) * 100 // 0-100, maxes at 100 cups per month

//     const coffeeAdventureIndex =
//       (varietyScore +
//         techniqueScore +
//         sustainabilityScore +
//         savingsScore +
//         consistencyScore) /
//       5

//     setCoffeeAdventureDetails({
//       variety: varietyScore,
//       technique: techniqueScore,
//       sustainability: sustainabilityScore,
//       savings: savingsScore,
//       consistency: consistencyScore
//     })

//     setResults({
//       monthlySavings,
//       monthlySavingsAfterFinancing,
//       yearlySavings,
//       breakEvenMonths,
//       fiveYearSavings,
//       lifetimeSavings,
//       annualROI,
//       cupsPerMonth,
//       additionalCoffeeShopVisits,
//       monthlyMilkCost,
//       dailyHomeBaristaTotal,
//       coffeeAdventureIndex,
//       fiveYearTotalCost,
//       averageCostPerCup
//     })

//     if (monthlySavings <= 0) {
//       const additionalMonthlySpend = Math.abs(monthlySavings)
//       setWarningMessage(
//         `Warning: With the current settings, you're not saving money. You're paying $${additionalMonthlySpend.toFixed(
//           2
//         )} more per month than at a coffee shop. Thank you for your generous donation to the home barista cause! Consider adjusting your choices for potential savings.`
//       )
//       setIsDonation(true)
//     } else {
//       setWarningMessage('')
//       setIsDonation(false)
//     }

//     const data = []
//     const totalCostComparisonData = []
//     let cumulativeSavings = 0
//     inflatedYearlySpend = yearlySpend
//     inflatedYearlySavings = yearlySavings
//     let totalHomeBaristaSpend = selectedMachine.price

//     for (let year = 0; year <= 10; year++) {
//       const coffeeShopCost = year === 0 ? 0 : inflatedYearlySpend

//       if (year > 0) {
//         totalHomeBaristaSpend +=
//           monthlySubscriptionCost * 12 +
//           additionalCoffeeShopCost * 12 +
//           annualMaintenanceCost +
//           monthlyMilkCost * 12

//         if (year % machineLifespan === 0) {
//           totalHomeBaristaSpend += selectedMachine.price
//         }
//       }

//       cumulativeSavings += year === 0 ? 0 : inflatedYearlySavings
//       const yearlyROI =
//         year === 0 ? 0 : (inflatedYearlySavings / totalHomeBaristaSpend) * 100

//       data.push({
//         year,
//         'Coffee Shop': Math.round(coffeeShopCost),
//         'Home Barista': Math.round(totalHomeBaristaSpend),
//         'Cumulative Savings': Math.round(cumulativeSavings),
//         'Yearly ROI': yearlyROI.toFixed(2),
//         'Monthly Savings': (inflatedYearlySavings / 12).toFixed(2)
//       })

//       totalCostComparisonData.push({
//         year,
//         'Coffee Shop': Math.round(coffeeShopCost),
//         'Home Barista': Math.round(totalHomeBaristaSpend),
//         'Cumulative Savings': Math.round(cumulativeSavings)
//       })

//       inflatedYearlySpend *= 1 + inflationRate
//       inflatedYearlySavings = (inflatedYearlySpend / 12 - totalMonthlyCost) * 12
//     }
//     setChartData(data)
//     setTotalCostComparison(totalCostComparisonData)
//   }, [
//     dailySpend,
//     daysPerWeek,
//     selectedMachine,
//     selectedTier,
//     financingMonths,
//     selectedMilk,
//     milkDeliveryFrequency
//   ])

//   useEffect(() => {
//     calculateSavings()
//   }, [calculateSavings])

//   const handleInputChange = (setter) => (e) => {
//     const value =
//       e.target.type === 'number' ? Number(e.target.value) : e.target.value
//     setter(value)
//   }

//   const getCoffeeAdventureRating = (cai) => {
//     if (cai < 20) return { title: 'Coffee Novice', icon: '☕' }
//     if (cai < 40) return { title: 'Curious Sipper', icon: '🍵' }
//     if (cai < 60) return { title: 'Home Barista Apprentice', icon: '⚗️' }
//     if (cai < 80) return { title: 'Coffee Connoisseur', icon: '🎩' }
//     return { title: 'Legendary Brewmaster', icon: '👑' }
//   }

//   const getCoffeeAdventureDescription = (cai) => {
//     if (cai < 20)
//       return "You're just starting your coffee adventure. There's a world of flavors waiting for you!"
//     if (cai < 40)
//       return "You're developing your palate and starting to explore the nuances of coffee."
//     if (cai < 60)
//       return "You're well on your way to becoming a skilled home barista. Keep experimenting!"
//     if (cai < 80)
//       return 'Your coffee knowledge and skills are impressive. You might be ready to enter some barista competitions!'
//     return "You've reached the pinnacle of home coffee brewing. Baristas come to you for advice!"
//   }

//   const getAdviceForImprovement = (details) => {
//     const lowestScore = Math.min(
//       details.variety,
//       details.technique,
//       details.sustainability,
//       details.savings,
//       details.consistency
//     )
//     const areaToImprove = Object.keys(details).find(
//       (key) => details[key] === lowestScore
//     )

//     switch (areaToImprove) {
//       case 'variety':
//         return 'Try upgrading your subscription tier to experience more coffee varieties.'
//       case 'technique':
//         return 'Consider investing in a more advanced coffee machine to expand your brewing techniques.'
//       case 'sustainability':
//         return 'Reduce your coffee shop visits to improve your sustainability score.'
//       case 'savings':
//         return 'Adjust your coffee habits to increase your long-term savings.'
//       case 'consistency':
//         return 'Try to increase your home brewing frequency for better consistency.'
//       default:
//         return 'Keep exploring and enjoying your coffee journey!'
//     }
//   }

//   return (
//     <div className="calculator">
//       <div className="calculator-content">
//         <div className="input-section">
//           <h3 className="section-title">Your Coffee Habits</h3>
//           <div className="input-group">
//             <label htmlFor="dailySpend">Average spend per coffee ($)</label>
//             <div className="input-wrapper">
//               <input
//                 type="range"
//                 id="dailySpend"
//                 min="1"
//                 max="50"
//                 step="0.5"
//                 value={dailySpend}
//                 onChange={handleInputChange(setDailySpend)}
//               />
//               <input
//                 type="number"
//                 value={dailySpend}
//                 onChange={handleInputChange(setDailySpend)}
//                 min="1"
//                 max="50"
//                 step="0.5"
//               />
//             </div>
//           </div>
//           <div className="input-group">
//             <label htmlFor="daysPerWeek">Coffee days per week</label>
//             <div className="input-wrapper">
//               <input
//                 type="range"
//                 id="daysPerWeek"
//                 min="1"
//                 max="7"
//                 step="1"
//                 value={daysPerWeek}
//                 onChange={handleInputChange(setDaysPerWeek)}
//               />
//               <input
//                 type="number"
//                 value={daysPerWeek}
//                 onChange={handleInputChange(setDaysPerWeek)}
//                 min="1"
//                 max="7"
//                 step="1"
//               />
//             </div>
//           </div>
//           <div className="input-group">
//             <label htmlFor="milk">OAT Milk Subscription</label>
//             <select
//               id="milk"
//               value={selectedMilk}
//               onChange={(e) => setSelectedMilk(e.target.value)}
//             >
//               {milkOptions.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//           {selectedMilk !== 'none' && (
//             <div className="input-group">
//               <label htmlFor="milkFrequency">
//                 Milk Delivery Frequency (days)
//               </label>
//               <div className="input-wrapper">
//                 <input
//                   type="range"
//                   id="milkFrequency"
//                   min="7"
//                   max="28"
//                   step="7"
//                   value={milkDeliveryFrequency}
//                   onChange={(e) =>
//                     setMilkDeliveryFrequency(Number(e.target.value))
//                   }
//                 />
//                 <span>{milkDeliveryFrequency} days</span>
//               </div>
//             </div>
//           )}
//           <div className="input-group">
//             <label htmlFor="machine">Preferred Breville machine</label>
//             <select
//               id="machine"
//               value={selectedMachine.name}
//               onChange={(e) =>
//                 setSelectedMachine(
//                   brevilleMachines.find((m) => m.name === e.target.value)
//                 )
//               }
//             >
//               {brevilleMachines.map((machine) => (
//                 <option key={machine.name} value={machine.name}>
//                   {machine.name} (${machine.price})
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="input-group">
//             <label htmlFor="tier">Subscription Tier</label>
//             <select
//               id="tier"
//               value={selectedTier.name}
//               onChange={(e) =>
//                 setSelectedTier(
//                   subscriptionTiers.find((t) => t.name === e.target.value)
//                 )
//               }
//             >
//               {subscriptionTiers.map((tier) => (
//                 <option key={tier.name} value={tier.name}>
//                   {tier.name} (${tier.price}/month, {tier.bagsPerMonth} bags)
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="input-group">
//             <label htmlFor="financing">Financing period (months)</label>
//             <div className="input-wrapper">
//               <input
//                 type="range"
//                 id="financing"
//                 min="1"
//                 max="60"
//                 step="1"
//                 value={financingMonths}
//                 onChange={handleInputChange(setFinancingMonths)}
//               />
//               <input
//                 type="number"
//                 value={financingMonths}
//                 onChange={handleInputChange(setFinancingMonths)}
//                 min="1"
//                 max="60"
//                 step="1"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="results-section">
//           <h3 className="section-title">Your Potential Savings</h3>
//           {warningMessage && (
//             <div className="warning-message">{warningMessage}</div>
//           )}

//           <div className="results-grid">
//             <div className="result-item">
//               <h5>Daily Home Barista Cost</h5>
//               <p>${results.dailyHomeBaristaTotal.toFixed(2)}</p>
//             </div>
//             <div className="result-item">
//               <h5>{isDonation ? 'Monthly Donation' : 'Monthly Savings'}</h5>
//               <p>${Math.abs(results.monthlySavings).toFixed(2)}</p>
//             </div>
//             <div className="result-item">
//               <h5>
//                 {isDonation
//                   ? 'Monthly Donation After Financing'
//                   : 'Monthly Savings After Financing'}
//               </h5>
//               <p>
//                 ${Math.abs(results.monthlySavingsAfterFinancing).toFixed(2)}
//               </p>
//             </div>
//             <div className="result-item">
//               <h5>{isDonation ? 'Yearly Donation' : 'Yearly Savings'}</h5>
//               <p>${Math.abs(results.yearlySavings).toFixed(2)}</p>
//             </div>
//             {!isDonation && (
//               <div className="result-item">
//                 <h5>Break-even Point</h5>
//                 <p>{results.breakEvenMonths} months</p>
//               </div>
//             )}
//             <div className="result-item">
//               <h5>{isDonation ? '5-Year Donation' : '5-Year Savings'}</h5>
//               <p>${Math.abs(results.fiveYearSavings).toFixed(2)}</p>
//             </div>
//             <div className="result-item">
//               <h5>Average Cost Per Cup (5 Years)</h5>
//               <p>${results.averageCostPerCup.toFixed(2)}</p>
//             </div>
//             <div className="result-item">
//               <h5>Total 5-Year Cost</h5>
//               <p>${results.fiveYearTotalCost.toFixed(2)}</p>
//             </div>
//           </div>

//           <div className="long-term-benefits">
//             <h5>Long-term Benefits</h5>
//             <p>
//               10-Year Lifetime Savings:{' '}
//               <span>${results.lifetimeSavings?.toFixed(2)}</span>
//             </p>
//             <p>
//               Annual Return on Investment:{' '}
//               <span>{results.annualROI?.toFixed(2)}%</span>
//             </p>
//           </div>
//         </div>
//       </div>

//       <motion.div
//         className="coffee-adventure-section"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h3 className="section-title">Your Coffee Adventure Profile</h3>
//         <div className="coffee-adventure-content">
//           <div className="coffee-adventure-details">
//             <motion.div
//               className="adventure-score"
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ type: 'spring', stiffness: 260, damping: 20 }}
//             >
//               <span className="score-number">
//                 {results.coffeeAdventureIndex?.toFixed(0)}
//               </span>
//               <span className="score-label">Adventure Score</span>
//             </motion.div>
//             <motion.div
//               className="adventure-rating"
//               initial={{ x: -50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               <span className="rating-icon">
//                 {getCoffeeAdventureRating(results.coffeeAdventureIndex).icon}
//               </span>
//               <span className="rating-title">
//                 {getCoffeeAdventureRating(results.coffeeAdventureIndex).title}
//               </span>
//             </motion.div>
//             <p className="adventure-description">
//               {getCoffeeAdventureDescription(results.coffeeAdventureIndex)}
//             </p>
//             <motion.div
//               className="improvement-advice"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4 }}
//             >
//               <h4>Barista's Tip</h4>
//               <p>{getAdviceForImprovement(coffeeAdventureDetails)}</p>
//             </motion.div>
//           </div>
//           <div className="coffee-adventure-chart">
//             <ResponsiveContainer width="100%" height={300}>
//               <RadarChart
//                 cx="50%"
//                 cy="50%"
//                 outerRadius="80%"
//                 data={[
//                   {
//                     subject: 'Variety',
//                     A: coffeeAdventureDetails.variety,
//                     icon: <FaCoffee />
//                   },
//                   {
//                     subject: 'Technique',
//                     A: coffeeAdventureDetails.technique,
//                     icon: <FaCog />
//                   },
//                   {
//                     subject: 'Sustainability',
//                     A: coffeeAdventureDetails.sustainability,
//                     icon: <FaLeaf />
//                   },
//                   {
//                     subject: 'Savings',
//                     A: coffeeAdventureDetails.savings,
//                     icon: <FaPiggyBank />
//                   },
//                   {
//                     subject: 'Consistency',
//                     A: coffeeAdventureDetails.consistency,
//                     icon: <FaCalendarCheck />
//                   }
//                 ]}
//               >
//                 <PolarGrid />
//                 <PolarAngleAxis
//                   dataKey="subject"
//                   tick={({ payload, x, y, cx, cy, ...rest }) => {
//                     return (
//                       <g>
//                         <text {...rest} x={x} y={y} textAnchor="middle">
//                           {payload.value}
//                         </text>
//                         <foreignObject
//                           x={x - 12}
//                           y={y - 35}
//                           width={24}
//                           height={24}
//                         >
//                           {payload.icon}
//                         </foreignObject>
//                       </g>
//                     )
//                   }}
//                 />
//                 <PolarRadiusAxis angle={30} domain={[0, 100]} />
//                 <Radar
//                   name="Coffee Adventure"
//                   dataKey="A"
//                   stroke="#8884d8"
//                   fill="#8884d8"
//                   fillOpacity={0.6}
//                 />
//               </RadarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </motion.div>

//       <div className="chart-section">
//         <h3 className="section-title">Cost Comparison Over Time</h3>
//         <div className="chart-tabs">
//           <button
//             onClick={() => setActiveTab('savings')}
//             className={activeTab === 'savings' ? 'active' : ''}
//           >
//             Savings Over Time
//           </button>
//           <button
//             onClick={() => setActiveTab('comparison')}
//             className={activeTab === 'comparison' ? 'active' : ''}
//           >
//             Cost Comparison
//           </button>
//           <button
//             onClick={() => setActiveTab('roi')}
//             className={activeTab === 'roi' ? 'active' : ''}
//           >
//             Return on Investment
//           </button>
//           <button
//             onClick={() => setActiveTab('monthlySavings')}
//             className={activeTab === 'monthlySavings' ? 'active' : ''}
//           >
//             Monthly Savings
//           </button>
//         </div>
//         <div className="chart">
//           {activeTab === 'savings' && (
//             <ResponsiveContainer width="100%" height={400}>
//               <AreaChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="year" />
//                 <YAxis />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Legend />
//                 <Area
//                   type="monotone"
//                   dataKey="Cumulative Savings"
//                   stroke="#82ca9d"
//                   fill="#82ca9d"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           )}
//           {activeTab === 'comparison' && (
//             <ResponsiveContainer width="100%" height={400}>
//               <LineChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="year" />
//                 <YAxis />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Legend />
//                 <Line type="monotone" dataKey="Coffee Shop" stroke="#8884d8" />
//                 <Line type="monotone" dataKey="Home Barista" stroke="#82ca9d" />
//               </LineChart>
//             </ResponsiveContainer>
//           )}
//           {activeTab === 'roi' && (
//             <ResponsiveContainer width="100%" height={400}>
//               <AreaChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="year" />
//                 <YAxis />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Legend />
//                 <Area
//                   type="monotone"
//                   dataKey="Yearly ROI"
//                   stroke="#ffc658"
//                   fill="#ffc658"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           )}
//           {activeTab === 'monthlySavings' && (
//             <ResponsiveContainer width="100%" height={400}>
//               <LineChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="year" />
//                 <YAxis />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="Monthly Savings"
//                   stroke="#82ca9d"
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           )}
//         </div>
//       </div>
//   <style jsx>{`
//     .calculator {
//       background-color: #f8f9fa;
//       padding: 5%;
//       border-radius: 15px;
//       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//       margin: 0 auto;
//       max-width: 1200px;
//       width: 90%;
//     }

//     .calculator-content {
//       display: flex;
//       justify-content: space-between;
//       gap: 4%;
//     }

//     .input-section,
//     .results-section {
//       flex: 1;
//       min-width: 0;
//       background-color: white;
//       padding: 5%;
//       border-radius: 10px;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
//     }

//     .section-title {
//       font-size: clamp(1.2rem, 3vw, 1.5rem);
//       color: #4a5568;
//       margin-bottom: 20px;
//       text-align: center;
//     }

//     .input-group {
//       margin-bottom: 25px;
//     }

//     .input-group label {
//       display: flex;
//       align-items: center;
//       gap: 10px;
//       color: #4a5568;
//       margin-bottom: 10px;
//       font-size: clamp(0.9rem, 2vw, 1rem);
//     }

//     .input-wrapper {
//       display: flex;
//       align-items: center;
//       gap: 10px;
//     }

//     .input-group input[type='range'] {
//       flex: 1;
//       -webkit-appearance: none;
//       width: 100%;
//       height: 8px;
//       border-radius: 4px;
//       background: linear-gradient(to right, #6f4e37, #d2691e);
//       outline: none;
//       opacity: 0.7;
//       transition: opacity 0.2s;
//     }

//     .input-group input[type='range']:hover {
//       opacity: 1;
//     }

//     .input-group input[type='range']::-webkit-slider-thumb {
//       -webkit-appearance: none;
//       appearance: none;
//       width: 24px;
//       height: 24px;
//       border-radius: 50%;
//       background: #fff;
//       border: 2px solid #6f4e37;
//       cursor: pointer;
//       box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
//     }

//     .input-group input[type='number'] {
//       width: 60px;
//       padding: 5px;
//       font-size: clamp(0.8rem, 2vw, 1rem);
//     }

//     .input-group select {
//       width: 100%;
//       padding: 10px;
//       font-size: clamp(0.8rem, 2vw, 1rem);
//       border: 2px solid #6f4e37;
//       border-radius: 5px;
//       background-color: #f0f4f8;
//       color: #4a5568;
//       cursor: pointer;
//       transition: all 0.3s ease;
//       font-weight: 600;
//     }

//     .input-group select:hover,
//     .input-group select:focus {
//       border-color: #6f4e37;
//       box-shadow: 0 0 0 2px rgba(111, 78, 55, 0.2);
//     }

//     .results-grid {
//       display: grid;
//       grid-template-columns: repeat(2, 1fr);
//       gap: 20px;
//       margin-top: 20px;
//     }

//     .result-item {
//       background-color: #f8f9fa;
//       border-radius: 10px;
//       padding: 15px;
//       text-align: center;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
//       transition: transform 0.3s ease, box-shadow 0.3s ease;
//     }

//     .result-item:hover {
//       transform: translateY(-5px);
//       box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//     }

//     .result-item h5 {
//       color: #4a5568;
//       margin-bottom: 10px;
//       font-size: clamp(0.9rem, 2vw, 1.1rem);
//     }

//     .result-item p {
//       color: #6f4e37;
//       font-size: clamp(1.1rem, 2.5vw, 1.4rem);
//       font-weight: bold;
//     }

//     .long-term-benefits {
//       margin-top: 30px;
//       background-color: #f8f9fa;
//       border-radius: 10px;
//       padding: 20px;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
//     }

//     .long-term-benefits h5 {
//       color: #4a5568;
//       margin-bottom: 15px;
//       font-size: 1.2rem;
//       text-align: center;
//     }

//     .long-term-benefits p {
//       color: #4a5568;
//       margin-bottom: 10px;
//     }

//     .long-term-benefits span {
//       font-weight: bold;
//       color: #6f4e37;
//     }

//     .coffee-adventure-section {
//       margin-top: 40px;
//       background: linear-gradient(135deg, #6f4e37 0%, #b17f4a 100%);
//       border-radius: 20px;
//       padding: 30px;
//       box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
//       color: #fff;
//     }

//     .coffee-adventure-content {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       gap: 30px;
//     }

//     .coffee-adventure-details {
//       flex: 1;
//     }

//     .adventure-score {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       margin-bottom: 20px;
//     }

//     .score-number {
//       font-size: 4em;
//       font-weight: bold;
//       color: #ffd700;
//       text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
//     }

//     .score-label {
//       font-size: 1.2em;
//       color: #f0e68c;
//     }

//     .adventure-rating {
//       display: flex;
//       align-items: center;
//       margin-bottom: 15px;
//     }

//     .rating-icon {
//       font-size: 2em;
//       margin-right: 10px;
//     }

//     .rating-title {
//       font-size: 1.5em;
//       font-weight: bold;
//       color: #f0e68c;
//     }

//     .adventure-description {
//       font-size: 1.1em;
//       margin-bottom: 20px;
//       line-height: 1.6;
//     }

//     .improvement-advice {
//       background-color: rgba(255, 255, 255, 0.1);
//       border-radius: 10px;
//       padding: 15px;
//       border-left: 5px solid #ffd700;
//     }

//     .improvement-advice h4 {
//       color: #ffd700;
//       margin-bottom: 10px;
//     }

//     .coffee-adventure-chart {
//       flex: 1;
//       background-color: rgba(255, 255, 255, 0.1);
//       border-radius: 15px;
//       padding: 20px;
//     }

//     .chart-section {
//       margin-top: 40px;
//       background-color: white;
//       padding: 5%;
//       border-radius: 10px;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
//     }

//     .chart-tabs {
//       display: flex;
//       justify-content: center;
//       margin-bottom: 20px;
//       flex-wrap: wrap;
//       gap: 10px;
//     }

//     .chart-tabs button {
//       background-color: #f8f9fa;
//       border: none;
//       padding: 10px 20px;
//       border-radius: 5px;
//       cursor: pointer;
//       transition: background-color 0.3s ease, color 0.3s ease;
//       color: #4a5568;
//       font-size: clamp(0.8rem, 2vw, 1rem);
//     }

//     .chart-tabs button.active {
//       background-color: #6f4e37;
//       color: white;
//     }

//     .chart {
//       background-color: #f8f9fa;
//       border-radius: 10px;
//       padding: 20px;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
//     }

//     .custom-tooltip {
//       background-color: rgba(255, 255, 255, 0.9);
//       border: 1px solid #d1d5db;
//       padding: 15px;
//       border-radius: 5px;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//     }

//     .custom-tooltip .label {
//       font-weight: bold;
//       margin-bottom: 10px;
//       color: #4a5568;
//     }

//     .warning-message {
//       background-color: #fff3cd;
//       color: #856404;
//       padding: 10px;
//       border-radius: 5px;
//       margin-bottom: 20px;
//       text-align: center;
//       font-weight: bold;
//     }

//     @media (max-width: 1024px) {
//       .calculator-content {
//         flex-direction: column;
//       }

//       .input-section,
//       .results-section {
//         width: 100%;
//         margin-bottom: 30px;
//       }
//     }

//     @media (max-width: 768px) {
//       .calculator {
//         padding: 20px;
//         width: 95%;
//       }

//       .results-grid {
//         grid-template-columns: 1fr;
//       }

//       .chart-tabs {
//         flex-direction: column;
//       }

//       .chart-tabs button {
//         width: 100%;
//       }

//       .coffee-adventure-content {
//         flex-direction: column;
//       }
//     }

//     @media (max-width: 480px) {
//       .input-wrapper {
//         flex-direction: column;
//         align-items: stretch;
//       }

//       .input-group input[type='number'] {
//         width: 100%;
//       }
//     }
//   `}</style>
//     </div>
//   )
// }

// export default SavingsCalculator

import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Page from '@shared/Page'
import Button from '@shared/atoms/Button'
import { useRouter } from 'next/router'
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
  const [financingMonths, setFinancingMonths] = useState(24)
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
            <div className="result-item">
              <h5>Cups of coffee per month</h5>
              <p>{results.cupsPerMonth}</p>
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
        .calculator {
          background-color: #f8f9fa;
          padding: 5%;
          border-radius: 15px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin: 0 auto;
          max-width: 1200px;
          width: 90%;
        }

        .calculator-content {
          display: flex;
          justify-content: space-between;
          gap: 4%;
        }

        .input-section,
        .results-section {
          flex: 1;
          min-width: 0;
          background-color: white;
          padding: 5%;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .section-title {
          font-size: clamp(1.2rem, 3vw, 1.5rem);
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
          font-size: clamp(0.9rem, 2vw, 1rem);
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
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(to right, #6f4e37, #d2691e);
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
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #6f4e37;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .input-group input[type='number'] {
          width: 60px;
          padding: 5px;
          font-size: clamp(0.8rem, 2vw, 1rem);
        }

        .input-group select {
          width: 100%;
          padding: 10px;
          font-size: clamp(0.8rem, 2vw, 1rem);
          border: 2px solid #6f4e37;
          border-radius: 5px;
          background-color: #f0f4f8;
          color: #4a5568;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .input-group select:hover,
        .input-group select:focus {
          border-color: #6f4e37;
          box-shadow: 0 0 0 2px rgba(111, 78, 55, 0.2);
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 20px;
        }

        .result-item {
          background-color: #f8f9fa;
          border-radius: 10px;
          padding: 15px;
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
          font-size: clamp(0.9rem, 2vw, 1.1rem);
        }

        .result-item p {
          color: #6f4e37;
          font-size: clamp(1.1rem, 2.5vw, 1.4rem);
          font-weight: bold;
        }

        .long-term-benefits {
          margin-top: 30px;
          background-color: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .long-term-benefits h5 {
          color: #4a5568;
          margin-bottom: 15px;
          font-size: 1.2rem;
          text-align: center;
        }

        .long-term-benefits p {
          color: #4a5568;
          margin-bottom: 10px;
        }

        .long-term-benefits span {
          font-weight: bold;
          color: #6f4e37;
        }

        .coffee-adventure-section {
          margin-top: 40px;
          background: linear-gradient(135deg, #6f4e37 0%, #b17f4a 100%);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          color: #fff;
        }

        .coffee-adventure-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 30px;
        }

        .coffee-adventure-details {
          flex: 1;
        }

        .adventure-score {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }

        .score-number {
          font-size: 4em;
          font-weight: bold;
          color: #ffd700;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .score-label {
          font-size: 1.2em;
          color: #f0e68c;
        }

        .adventure-rating {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }

        .rating-icon {
          font-size: 2em;
          margin-right: 10px;
        }

        .rating-title {
          font-size: 1.5em;
          font-weight: bold;
          color: #f0e68c;
        }

        .adventure-description {
          font-size: 1.1em;
          margin-bottom: 20px;
          line-height: 1.6;
        }

        .improvement-advice {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 15px;
          border-left: 5px solid #ffd700;
        }

        .improvement-advice h4 {
          color: #ffd700;
          margin-bottom: 10px;
        }

        .coffee-adventure-chart {
          flex: 1;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 20px;
        }

        .chart-section {
          margin-top: 40px;
          background-color: white;
          padding: 5%;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .chart-tabs {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .chart-tabs button {
          background-color: #f8f9fa;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease;
          color: #4a5568;
          font-size: clamp(0.8rem, 2vw, 1rem);
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

        .warning-message {
          background-color: #fff3cd;
          color: #856404;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: bold;
        }

        @media (max-width: 1024px) {
          .calculator-content {
            flex-direction: column;
          }

          .input-section,
          .results-section {
            width: 100%;
            margin-bottom: 30px;
          }
        }

        @media (max-width: 768px) {
          .calculator {
            padding: 20px;
            width: 95%;
          }

          .results-grid {
            grid-template-columns: 1fr;
          }

          .chart-tabs {
            flex-direction: column;
          }

          .chart-tabs button {
            width: 100%;
          }

          .coffee-adventure-content {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .input-wrapper {
            flex-direction: column;
            align-items: stretch;
          }

          .input-group input[type='number'] {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default SavingsCalculator
