
import { getSession } from '@auth0/nextjs-auth0';
import { FaUserCheck } from 'react-icons/fa';

import { Text } from '../styles/Text';
import { PromptBox, ImagedBackground, RefreshButton } from '../styles/email-verification-styles';

const centerChilds = { display: "flex", justifyContent: "center", alignItems: "center" };

export default function EmailVerificationPrompt() {

  return (
    <ImagedBackground>
      <PromptBox>
        <Text size={1}>
          {"A verification link has been sent to your email.\nYou can use this site after verifying your email. (´･_･`) "}
        </Text>
        <RefreshButton onClick={() => window.location.reload()} >
          <Text size={2} style={centerChilds}>
            <FaUserCheck />
          </Text>
        </RefreshButton>
      </PromptBox>
    </ImagedBackground>
  )
}


export const getServerSideProps = async ({ req, res }) => {
  const auth0User = getSession(req, res);
  if (auth0User)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };


  return { props: {} }
};

