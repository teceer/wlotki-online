"use client";
import { useState } from "react";
import {
  SketchPicker,
  type ColorChangeHandler,
  type RGBColor,
} from "react-color";

export const ColorPicker = ({
  state,
  setState,
}: {
  state: {
    displayColorPicker: boolean;
    color: RGBColor;
  };
  setState: (state: { displayColorPicker: boolean; color: RGBColor }) => void;
}) => {
  const handleClick = () => {
    setState({ ...state, displayColorPicker: !state.displayColorPicker });
  };

  const handleClose = () => {
    setState({ ...state, displayColorPicker: false });
  };

  const handleChange: ColorChangeHandler = (color) => {
    setState({ ...state, color: color.rgb });
  };

  return (
    <div>
      <div
        className="inline-block cursor-pointer rounded-md border p-2"
        onClick={handleClick}
      >
        <div
          className="h-4 w-8 rounded"
          style={{
            background: `rgba(${state.color.r}, ${state.color.g}, ${state.color.b}, ${state.color.a})`,
          }}
        />
      </div>
      {state.displayColorPicker ? (
        <div className="absolute z-[2] overflow-hidden rounded-xl border bg-background text-black">
          <div
            className="fixed bottom-0 left-0 right-0 top-0"
            onClick={handleClose}
          />
          <SketchPicker
            // styles={{ default: { picker: { background: "white" } } }}
            color={state.color}
            onChange={handleChange}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
