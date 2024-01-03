import Image from "next/image";
import picture from "/public/random.png";

export default function DotsTexture() {
  return (
    // <svg
    //   width="100%"
    //   height="100%"
    //   className="absolute left-0 top-0 -z-50 opacity-30 dark:opacity-40"
    // >
    //   <pattern
    //     id="pattern-circles"
    //     x="0"
    //     y="0"
    //     width="5"
    //     height="5"
    //     patternUnits="userSpaceOnUse"
    //     patternContentUnits="userSpaceOnUse"
    //   >
    //     <circle
    //       id="pattern-circle"
    //       cx="2.5"
    //       cy="2.5"
    //       r="0.5"
    //       fill="#3b3b3b"
    //     ></circle>
    //   </pattern>

    //   <rect
    //     id="rect"
    //     x="0"
    //     y="0"
    //     width="100%"
    //     height="100%"
    //     fill="url(#pattern-circles)"
    //   ></rect>
    // </svg>
    // <svg
    //   id="patternId"
    //   width="100%"
    //   height="100%"
    //   xmlns="http://www.w3.org/2000/svg"
    //   className="absolute left-0 top-0 -z-50 opacity-30 dark:opacity-40"
    // >
    //   <defs>
    //     <pattern
    //       id="a"
    //       patternUnits="userSpaceOnUse"
    //       width="20"
    //       height="20"
    //       patternTransform="scale(0.25) rotate(0)"
    //     >
    //       <path
    //         d="M10-6V6M10 14v12M26 10H14M6 10H-6"
    //         stroke-linecap="square"
    //         stroke-width="0.5"
    //         stroke="hsla(259, 0%, 50%, 1)"
    //         fill="none"
    //       />
    //     </pattern>
    //   </defs>
    //   <rect
    //     width="800%"
    //     height="800%"
    //     transform="translate(0,0)"
    //     fill="url(#a)"
    //   />
    // </svg>
    <div className="absolute left-0 top-0 -z-50 h-full w-full">
      <div
        style={{
          backgroundImage: `url(${picture.src})`,
          backgroundRepeat: "repeat",
          backgroundSize: "100px 100px",
        }}
        className="h-full w-full opacity-70 dark:opacity-40"
      />
    </div>
  );
}
