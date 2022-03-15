import React from 'react';
import './TimeDropdown.css';

// This is a drop down component with options and values
function TimeDropdown({ label, options, value, onChange, testID }) {
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <select
        data-testid={testID}
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}>
        <option value="">Select</option>
        {
          options.map(option =>
            <option key={option} value={option}>{option}</option>
          )
        }
      </select>
    </div>
  )
}

export default TimeDropdown