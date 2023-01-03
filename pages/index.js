import React from 'react';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import BottomNavigationBar from '../components/BottomNavigation/BottomNavigationBar';
import ProfileInformationBar from '../components/ProfileBar/ProfileInformationBar';
import { MainContent, Page } from '../styles/Page';
import { useUserPreferencesStore } from '../store';
import { addAuth0UserToDatabase, getUserWithAuth0ID } from '../Utils/database';
import OwnedProperties from '../components/Properties/OwnedProperties';
import RentedProperties from '../components/Properties/RentedProperties';



export default function Dashboard({ profile }) {

  const setUserID = useUserPreferencesStore((state) => state.setUserID);
  setUserID(profile.authID);


  return (
    <Page>
      <ProfileInformationBar profile={profile} />
      <MainContent>
        <OwnedProperties profile={profile} />
        <RentedProperties profile={profile} />
      </MainContent>
      <BottomNavigationBar />
    </Page>
  )
}



export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {

    const auth0User = getSession(req, res);
    // not authenticated by auth0
    if (!auth0User || !auth0User?.user) return { notFound: true };

    // authenticated by auth0
    const { data, error } = await getUserWithAuth0ID(auth0User?.user?.sub);

    // error with supabase query
    if (error || !data) return { notFound: true };

    // found auth0 user in supabase users table
    if (data.length !== 0) return { props: { profile: data[0] } }

    // auth0 user is not in supabase users table (insert user)
    if (data.length === 0) {
      let { insertedProfile, insertError } = await addAuth0UserToDatabase(auth0User.user);

      // error inserting user to supabase
      if (insertError)
        return { notFound: true };

      return { props: { profile: insertedProfile } }
    }


    return { notFound: true };

  },
});

