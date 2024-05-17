import React from "react";

function InputSlider({ min, max, step, value, onChange }) {
  return (
    <div className="relative w-full mx-4">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-blue-500"
      />
      <div
        className="absolute top-2.5 left-0 h-2 bg-blue-500 rounded-lg pointer-events-none"
        style={{ width: `${(value / max) * 100 + 0.6}%` }}
      ></div>
    </div>
  );
}

export default InputSlider;
