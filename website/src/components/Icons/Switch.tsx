import type { IconSvgProps } from '../types';

export function SwitchIcon({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={size || height}
      width={size || width}
      {...props}
    >
      <path
        fill="currentColor"
        d="M7 18q-2.5 0-4.25-1.75T1 12q0-2.5 1.75-4.25T7 6h10q2.5 0 4.25 1.75T23 12q0 2.5-1.75 4.25T17 18Zm0-2h10q1.65 0 2.825-1.175Q21 13.65 21 12q0-1.65-1.175-2.825Q18.65 8 17 8H7Q5.35 8 4.175 9.175Q3 10.35 3 12q0 1.65 1.175 2.825Q5.35 16 7 16Zm0-1q1.25 0 2.125-.875T10 12q0-1.25-.875-2.125T7 9q-1.25 0-2.125.875T4 12q0 1.25.875 2.125T7 15Zm5-3Z"
      />
    </svg>
  );
}
