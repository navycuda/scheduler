// src/hooks/useVisualMode.test.js
import { renderHook, act } from "react-hooks-testing-library";
import useVisualMode from "./useVisualMode";

const FIRST = "FIRST";

test("useVisualMode should initialize with default value", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  expect(result.current.mode).toBe(FIRST);
});