import {
  Body,
  Button,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface VercelInviteUserEmailProps {
  previewText?: string;
  heading: string;
  text: string;
  cta?: {
    text: string;
    link: string;
  };
}

export const Email = (props: VercelInviteUserEmailProps) => {
  const previewText = props.previewText;
  const heading = props.heading;
  const text = props.text;
  const cta = props.cta;

  return (
    <Html>
      <Head />
      {previewText && <Preview>{previewText}</Preview>}
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Section className="mx-auto my-[40px] w-[465px] rounded-xl border border-solid border-[#eaeaea] shadow-lg">
            <Section className="m-0 px-8 py-4">
              <Heading className="p-0 text-[24px] font-bold text-black">
                {heading}
              </Heading>
            </Section>
            <Hr className="m-0 w-full border-[0.5px] border-solid border-[#eaeaea] p-0" />
            <Section className="m-0 px-8 py-4">
              <Text className="text-[14px] leading-[24px] text-black">
                {text}
              </Text>
            </Section>
            {cta && (
              <Section className="px-8 py-4">
                <Button
                  className="rounded bg-[#000000] px-4 py-3 text-center text-[14px] font-semibold text-white no-underline"
                  href={cta.link}
                >
                  {cta.text}
                </Button>
                <Text className="text-[14px] leading-[24px] text-black/30">
                  użyj przycisku lub wklej poniższy link do przeglądarki:
                  <br />
                  <Link href={cta.link} className="text-blue-600 no-underline">
                    {cta.link}
                  </Link>
                </Text>
              </Section>
            )}
            <Hr className="m-0 w-full border-[0.5px] border-solid border-[#eaeaea] p-0" />
            <Section className="m-0 px-8 py-4">
              <Text className="text-[12px] leading-[24px] text-[#666666]">
                Wiadomość wysłana automatycznie.
              </Text>
            </Section>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default Email;
