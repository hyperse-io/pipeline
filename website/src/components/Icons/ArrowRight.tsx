import type { IconSvgProps } from '../types';

export function ArrowRightIcon({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      height={size || height}
      width={size || width}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}
