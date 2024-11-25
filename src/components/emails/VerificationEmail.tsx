import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Text,
  Button,
  Container,
  Section,
} from "@react-email/components"

interface VerificationEmailProps {
  name: string
  link: string
}

const button = {
  backgroundColor: "#3949AB",
  borderRadius: 5,
  color: "#FFF",
  fontWeight: "bold",
  cursor: "pointer",
  padding: "12px 30px",
}

export default function VerificationEmail({
  name,
  link,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Email Verification</Preview>
      <Container>
        <Heading as="h2">Verify your email address</Heading>
        <Section>
          <Text>Hello {name},</Text>
          <Text>
            Thank you for registering on <b>Time Management App</b>. To make
            sure this is your email address, we need to verify it.
          </Text>
          <Button style={button} href={link}>
            Verify here
          </Button>
        </Section>
        <Text
          style={{
            fontSize: "10px",
            color: "gray",
          }}
        >
          This link will expire after 1 hour.
        </Text>
      </Container>
    </Html>
  )
}
