import * as React from "react";
import { SVGProps } from "react";

const Svg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={109} height={109} {...props}>
    <g
      style={{
        fill: "none",
        stroke: "#000",
        strokeWidth: 3,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }}
    >
      <path d="M34.75 26.75c1.12.88 2.91 2.01 6 1.5 7.62-1.25 14.11-2.56 22.38-2.62 15.5-.12 5.88 5-5.75 9M30 68.12c2.25 14.5 15.26 17.96 31 16.75 6.5-.5 11.88-1.25 17.62-2.88" />
    </g>
    <g
      style={{
        fontSize: 8,
        fill: "gray",
      }}
    >
      <text transform="translate(28 25.88)">{"1"}</text>
      <text transform="translate(23.75 68.13)">{"2"}</text>
    </g>
  </svg>
);

export default Svg;
