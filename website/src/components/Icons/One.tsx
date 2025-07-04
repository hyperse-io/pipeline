import type { IconSvgProps } from '../types';

export function OneIcon({ size = 24, width, height, ...props }: IconSvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      stroke="none"
      viewBox="-1 0 19 19"
      height={size || height}
      width={size || width}
      {...props}
    >
      <path d="M16.417 9.6A7.917 7.917 0 1 1 8.5 1.683 7.917 7.917 0 0 1 16.417 9.6zM9.666 6.508H8.248L6.09 8.09l.806 1.103 1.222-.945v4.816h1.547z" />
    </svg>
  );
}
