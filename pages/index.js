import React from 'react';
import BottomNavigationBar from '../components/BottomNavigation/BottomNavigationBar';
import ProfileInformationBar from '../components/ProfileBar/ProfileInformationBar';
import { MainContent, Page } from '../styles/Page';
import { useUserPreferencesStore } from '../store';
import { addAuth0UserToDatabase, getUserWithAuth0ID } from '../Utils/database';
import OwnedProperties from '../components/Properties/OwnedProperties';
import RentedProperties from '../components/Properties/RentedProperties';



export default function Dashboard({ }) {

  // const setUserID = useUserPreferencesStore((state) => state.setUserID);
  // setUserID(profile.authID);

  let profile = null;

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

