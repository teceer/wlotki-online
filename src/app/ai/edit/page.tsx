// import React from "react";
// import GeneratePrint from "./GaneratePrint";
// import fs from "fs";

// export default function page() {
//   const imageFile = fs.createReadStream("public/ai/shoutout.png");
//   const maskFile = fs.createReadStream("public/ai/mask.png");
//   return (
//     <GeneratePrint
//       imageFile={imageFile}
//       maskFile={maskFile}
//       prompt="generate another variation of the galaxy"
//     />
//   );
// }
import React from "react";
import OpenAI from "openai";
import fs from "fs";

import path from "path";

export default async function page() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return <div>no api key</div>;
  const imagePath = path.join(process.cwd(), "public/ai/shoutout.png");
  const maskPath = path.join(process.cwd(), "public/ai/mask.png");
  const imageFile = fs.createReadStream(imagePath);
  const maskFile = fs.createReadStream(maskPath);
  const openai = new OpenAI({ apiKey });
  const images = await openai.images.edit({
    image: imageFile,
    mask: maskFile,
    prompt: "generate another variation of the galaxy",
    n: 1,
    size: "512x512",
  });

  return (
    <div>
      {images?.data.map((image) => {
        return (
          <div key={image.url}>
            <img src={image.url} alt="generated image" />
          </div>
        );
      })}
    </div>
  );
}
