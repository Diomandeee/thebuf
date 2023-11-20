// components/Categories.js

import React, { useState } from 'react'

const Categories = ({ categories, onSelectCategory }) => {
  const [activeCategory, setActiveCategory] = useState(null)

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '15px',
    marginBottom: '30px',
    padding: '20px 0'
  }

  const buttonStyle: React.CSSProperties = {
    padding: '10px 15px',
    border: '2px solid #ffffff50', // semi-transparent white border
    backgroundColor: 'transparent',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '12px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: 'all 0.3s ease'
  }

  const activeStyle: React.CSSProperties = {
    backgroundColor: 'white',
    color: 'black',
    transform: 'scale(1.1)'
  }

  const handleCategoryClick = (category) => {
    setActiveCategory(category)
    onSelectCategory(category)
  }

  return (
    <div style={containerStyle}>
      {categories.map((category, index) => (
        <button
          key={index}
          style={
            category === activeCategory
              ? { ...buttonStyle, ...activeStyle }
              : buttonStyle
          }
          onClick={() => handleCategoryClick(category)}
          onMouseOver={(e) => {
            if (category !== activeCategory) {
              Object.assign(e.currentTarget.style, activeStyle)
            }
          }}
          onMouseOut={(e) => {
            if (category !== activeCategory) {
              Object.assign(e.currentTarget.style, buttonStyle)
            }
          }}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default Categories
