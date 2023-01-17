import React from 'react';
import BottomNavigationBar from '../components/BottomNavigation/BottomNavigationBar';
import { MainContent, Page } from '../styles/Page';
import ProfileInformationBar from '../components/ProfileBar/ProfileInformationBar';
import { addAuth0UserToDatabase, getUserWithAuth0ID } from '../Utils/database';
import AddRentedPropertyBox from '../components/AddPropertyBox/AddRentedProperty';




export default function Dashboard({ profile }) {
  return (
    <Page>
      <ProfileInformationBar profile={profile} />
      <MainContent>
        <AddRentedPropertyBox profile={profile}/>
      </MainContent>
      <BottomNavigationBar />
    </Page>
  )
}




