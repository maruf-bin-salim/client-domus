import {
    supabase
} from "../supabaseClient";


// users
// add user
async function addAuth0UserToDatabase(user) {

    let item = {
        authID: user.sub,
        authUser: user,
        name: user.nickname,
        ownedProperties: [],
        rentedProperties: []
    };

    const {
        data,
        error
    } = await supabase
        .from('users')
        .insert([item])

    return {
        insertedProfile: data,
        insertError: error
    }
}
// retrive all users
async function getAllUsers() {
    const {
        data,
        error
    } = await supabase
        .from('users')
        .select('*');
    return {
        data,
        error
    };
}

// retrieve user
async function getUserWithAuth0ID(auth0ID) {
    const {
        data,
        error
    } = await supabase
        .from('users')
        .select('*')
        .eq('authID', auth0ID);

    return {
        data,
        error
    };
}
// update user
async function changeNameOfUser(userID, name) {

    const {
        data,
        error
    } = await supabase
        .from('users')
        .update({
            name: name
        })
        .eq("authID", userID)

    return {
        updatedProfile: data,
        updateError: error
    }
}
// issues
// get issues
async function getIssuesOfProperty(propertyId) {
    const {
        data,
        error
    } = await supabase
        .from('issues')
        .select('*')
        .eq('propertyID', propertyId);
    return {
        issues: data,
        error
    };
}
// add issue
async function addIssueToDatabase(issue) {
    const {
        data,
        error
    } = await supabase
        .from('issues')
        .insert([issue])

    return {
        insertedIssue: data,
        insertError: error
    }
}
// update issue
async function changeStatusOfIssue(issueID, currentStatus) {

    const {
        data,
        error
    } = await supabase
        .from('issues')
        .update({
            currentStatus: currentStatus
        })
        .eq("id", issueID)
    return {
        updatedIssue: data,
        updateError: error
    }
}
async function setClosingTimeOfIssue(issueID, issueClosedAt) {
    const {
        data,
        error
    } = await supabase
        .from('issues')
        .update({
            issueClosedAt: issueClosedAt
        })
        .eq("id", issueID)
    return {
        updatedIssue: data,
        updateError: error
    }
}
// delete issues
async function deleteIssueOfProperty(propertyID) {
    const {
        data,
        error
    } = await supabase
        .from('issues')
        .delete()
        .match({
            propertyID: propertyID
        });

    return {
        data,
        error
    };
}
// property
// get property
async function getRentedPropertiesOfUser(ID) {
    const {
        data,
        error
    } = await supabase
        .from('properties')
        .select('*')
        .eq('renterID', ID);
    return {
        data,
        error
    };
}
async function getOwnedPropertiesOfUser(ID) {
    const {
        data,
        error
    } = await supabase
        .from('properties')
        .select('*')
        .eq('ownerID', ID);
    return {
        data,
        error
    };
}
async function getPropertyBySecretKey(KEY) {
    const {
        data,
        error
    } = await supabase
        .from('properties')
        .select('*')
        .eq('propertySecretKey', KEY);
    return {
        data,
        error
    };
}
// add property
async function addPropertyToDatabase(property) {
    const {
        data,
        error
    } = await supabase
        .from('properties')
        .insert([property])

    return {
        insertedProperty: data,
        insertError: error
    }
}
// update property
async function updatePropertyByID(propertyID, property) {

    const {
        data,
        error
    } = await supabase
        .from('properties')
        .update(property)
        .eq("propertyID", propertyID)

    return {
        updatedProperty: data,
        updateError: error
    }
}
async function updatePropertyRenterID(propertyID, profile) {

    const {
        data,
        error
    } = await supabase
        .from('properties')
        .update({
            renterID: profile.authID
        })
        .eq("propertyID", propertyID)

    return {
        updatedProperty: data,
        updateError: error
    }
}
// delete  property
async function deleteOwnedPropertyByID(ID) {
    const {
        data,
        error
    } = await supabase
        .from('properties')
        .delete()
        .match({
            propertyID: ID
        });

    return {
        data,
        error
    };
}
//history
// add history
async function addHistoryToDatabase(history) {
    const {
        data,
        error
    } = await supabase
        .from('histories')
        .insert([history])

    return {
        data,
        error
    }
}
// get history of issue
async function getHistoryOfIssue(issueID) {
    const {
        data,
        error
    } = await supabase
        .from('histories')
        .select('*')
        .eq('issueID', issueID);
    return {
        data,
        error
    };
}
// notifications
// add history
async function addNotificationToDatabase(notification) {
    const {
        data,
        error
    } = await supabase
        .from('notifications')
        .insert([notification])

    return {
        data,
        error
    }
}
// get notification of user
async function getNotificationsOfUser(userID) {
    const {
        data,
        error
    } = await supabase
        .from('notifications')
        .select('*')
        .eq('sentTo', userID);
    return {
        data,
        error
    };
}


// add thread to database
async function addThreadToDatabase(threadID, lastMessageContent, lastUpdationTime) {
    const {
        data,
        error
    } = await supabase
        .from('threads')
        .insert([{ threadID: threadID, lastMessageContent: lastMessageContent, lastUpdationTime: lastUpdationTime }])

    return {
        data,
        error
    }
}

// retrieve thread
async function getThread(threadID) {

    const {
        data,
        error
    } = await supabase
        .from('threads')
        .select('*')
        .eq('threadID', threadID);

    return { data, error };
}

// update thread
async function updateThreadByID(threadID, lastMessageContent, lastUpdationTime) {

    const {
        data,
        error
    } = await supabase
        .from('threads')
        .update({
            lastMessageContent: lastMessageContent,
            lastUpdationTime: lastUpdationTime
        })
        .eq("threadID", threadID)

    return {
        data,
        error
    }
}

export {
    getAllUsers,
    getUserWithAuth0ID,
    addAuth0UserToDatabase,
    changeNameOfUser,

    getRentedPropertiesOfUser,
    getOwnedPropertiesOfUser,
    getPropertyBySecretKey,

    addPropertyToDatabase,
    updatePropertyByID,
    updatePropertyRenterID,
    deleteOwnedPropertyByID,

    addIssueToDatabase,
    getIssuesOfProperty,
    changeStatusOfIssue,
    setClosingTimeOfIssue,
    deleteIssueOfProperty,

    addHistoryToDatabase,
    getHistoryOfIssue,

    addNotificationToDatabase,
    getNotificationsOfUser,

    addThreadToDatabase,
    getThread,
    updateThreadByID,
}