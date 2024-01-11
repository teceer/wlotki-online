import React from "react";
import OpenAI from "openai";

export default async function page() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return <div>no api key</div>;

  const openai = new OpenAI({ apiKey });
  const image = await openai.images.generate({
    model: "dall-e-3",
    prompt:
      "hyperrealistic galaxy on black background, black and white colors, vintage distressed screenprint texture",
    n: 1,
    style: "vivid",
    size: "1024x1024",
  });

  console.log(image.data[0]?.url);
  
  return (
    <div>
      {image.data.map((image) => {
        return (
          <div key={image.url}>
            <img src={image.url} alt="generated image" />
          </div>
        );
      })}
    </div>
  );
}
