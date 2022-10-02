const BorderSvg = ({ className, ...rest }: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="154"
    height="1"
    viewBox="0 0 154 1"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <ellipse cx="76.8936" cy="0.249512" rx="76.4551" ry="0.25" fill="url(#paint0_linear_114_251)" />
    <defs>
      <linearGradient
        id="paint0_linear_114_251"
        x1="22.583"
        y1="0.249507"
        x2="140.151"
        y2="0.249184"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#CB69ED" stopOpacity="0" />
        <stop offset="0.254766" stopColor="#15BBE2" />
        <stop offset="0.551648" stopColor="#CB69ED" />
        <stop offset="1" stopColor="#CB69ED" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
)

export default BorderSvg
