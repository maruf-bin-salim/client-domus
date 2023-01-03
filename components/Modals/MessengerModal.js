import { useEffect, useRef, useState } from 'react'
import {
    FlexBox, Message, MessengerInputContainer, MessengerModalContainer,
    MessengerProfileImage, MessengerThreadContainer,
    MessengerTopbar, MessnegerSearchInput,
    MessengerTimeStamp,
    MessageSenderInfo,
    MessageProfileImage,
    MessageContent,
    MessnegerInput
} from './Modals.styles'
import { centerChilds, Text } from '../../styles/Text';
import { TiArrowBack } from 'react-icons/ti';
import { BiHash } from 'react-icons/bi';
import { AiOutlineSend } from 'react-icons/ai';
import { getThreadId } from '../../Utils/getThreadID';
import { addThreadToDatabase, getAllUsers, getThread } from '../../Utils/database';
import { getBangladeshTime } from '../../Utils/getBangladeshTime';


const sendTo = { name: 'maruf', id: 1 };
const self = { name: 'grey', id: 2 }

const messages = [
    {
        id: 123123,
        senderID: 1,
        senderName: "grey",
        recieverID: 2,
        recieverName: "maruf",
        content: "this is the first demo message, hello, this is the first demo message, hello, big message, big message, this is the first demo message, hello, this is the first demo message, hello , this is the first demo message, hello",
        timestamp: "sunday, 28/11/2022 12:15 AM",
    },
    {
        id: 123123,
        senderID: 2,
        senderName: "maruf",
        recieverID: 1,
        recieverName: "grey",
        content: "this is the first demo message, hello",
        timestamp: "sunday, 28/11/2022 12:15 AM",
    },
    {
        id: 123123,
        senderID: 1,
        senderName: "grey",
        recieverID: 2,
        recieverName: "maruf",
        content: "this is the first demo message, hello",
        timestamp: "sunday, 28/11/2022 12:15 AM",
    },
    {
        id: 123123,
        senderID: 1,
        senderName: "grey",
        recieverID: 2,
        recieverName: "maruf",
        content: "this is the first demo message, hello",
        timestamp: "sunday, 28/11/2022 12:15 AM",
    },
    {
        id: 123123,
        senderID: 1,
        senderName: "grey",
        recieverID: 2,
        recieverName: "maruf",
        content: "this is the first demo message, hello",
        timestamp: "sunday, 28/11/2022 12:15 AM",
    },
    {
        id: 123123,
        senderID: 1,
        senderName: "grey",
        recieverID: 2,
        recieverName: "maruf",
        content: "this is the first demo message, hello",
        timestamp: "sunday, 28/11/2022 12:15 AM",
    },
    {
        id: 123123,
        senderID: 2,
        senderName: "maruf",
        recieverID: 1,
        recieverName: "grey",
        content: "this is the first demo message, hello",
        timestamp: "sunday, 28/11/2022 12:15 AM",
    },
    {
        id: 123123,
        senderID: 1,
        senderName: "grey",
        recieverID: 2,
        recieverName: "maruf",
        content: "this is the first demo message, hello",
        timestamp: "sunday, 28/11/2022 12:15 AM",
    },
];


const MODES =
{
    THREAD_OPEN: 'THREAD_OPEN',
    THREAD_CLOSED: 'THREAD_CLOSED',
    THREAD_SEARCHING: 'THREAD_SEARCHING'
};



function MessageContainer({ message, isSelfMessage }) {
    if (isSelfMessage === false) {
        return (
            <Message>
                <MessageSenderInfo style={{ marginLeft: "auto" }}>
                    <MessengerTimeStamp>
                        {message.timestamp}
                    </MessengerTimeStamp>
                    <Text style={{ ...centerChilds, wordBreak: 'break-all' }}>
                        <BiHash />
                        {message.senderName}
                    </Text>
                    <MessageProfileImage src={"/default_profile_picture.png"} alt={message.senderName} />
                </MessageSenderInfo>
                <MessageContent style={{ marginLeft: "auto" }}>
                    <Text>
                        {message.content}
                    </Text>
                </MessageContent>
            </Message>
        )
    }
    else {
        return (
            <Message>
                <MessageSenderInfo>
                    <MessageProfileImage src={"/default_profile_picture.png"} alt={message.senderName} />
                    <Text style={centerChilds}>
                        <BiHash />
                        {message.senderName}
                    </Text>
                    <MessengerTimeStamp>
                        {message.timestamp}
                    </MessengerTimeStamp>
                </MessageSenderInfo>
                <MessageContent>
                    <Text>
                        {message.content}
                    </Text>
                </MessageContent>
            </Message>
        )
    }
}

function Thread({ profile, threadID, setThreadID, setSearchInput }) {


    let scrollTextRef = useRef();
    const [currentThread, setCurrentThread] = useState([]);

    useEffect(() => {
        scrollTextRef?.current?.scrollIntoView({ behavior: 'smooth' });;
    }, [messages]);

    async function fetchOrCreateThread(threadID) {

        let { data, error } = await getThread(threadID);
        if (data && data.length !== 0) 
        {
            setCurrentThread(data[0]);
        }
        else {
            await addThreadToDatabase(threadID, "", getBangladeshTime());
        }
    }

    useEffect(() => {
        if (threadID) fetchOrCreateThread(threadID);
    }, [threadID])




    return (
        <MessengerModalContainer>
            <MessengerTopbar>
                <Text size={1} style={{ width: "max-content" }} onClick={() => { setThreadID(null); setSearchInput(''); }}>
                    <TiArrowBack /> Back
                </Text>
                <MessengerProfileImage src={"/default_profile_picture.png"} alt={sendTo.name} />
                <Text size={1} style={{ width: "max-content", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <BiHash />
                    {sendTo.name}
                </Text>
            </MessengerTopbar>
            <MessengerThreadContainer>
                {
                    messages.map((message, index) => {
                        return (<MessageContainer key={index} message={message} isSelfMessage={(message.senderID === self.id)} />)
                    })
                }
                <Text ref={scrollTextRef}></Text>
            </MessengerThreadContainer>
            <MessengerInputContainer>
                <MessnegerInput type="text" placeholder={`Message #${sendTo.name}`} spellCheck="false" />
                <Text size={3} style={centerChilds}>
                    <AiOutlineSend />
                </Text>
            </MessengerInputContainer>

        </MessengerModalContainer>
    )

}


export default function MessengerModal({ profile, currentThreadID }) {



    //

    const [currentMode, setCurrentMode] = useState(MODES.THREAD_CLOSED);
    const [threadID, setThreadID] = useState(currentThreadID);
    const [searchInput, setSearchInput] = useState('');
    const [users, setUsers] = useState([]);


    useEffect(() => {
        if (threadID) {
            setCurrentMode(MODES.THREAD_OPEN);
        }
        else
            setCurrentMode(MODES.THREAD_CLOSED);
    }, [threadID]);



    useEffect(() => {
        if (searchInput !== '')
            setCurrentMode(MODES.THREAD_SEARCHING);
        else
            setCurrentMode(MODES.THREAD_CLOSED);

    }, [searchInput]);

    async function fetchUsers() {
        let { data } = await getAllUsers();
        setUsers(data);
    }

    useEffect(() => {
        fetchUsers();
    }, []);


    function usersFilteredByInput(user) {
        return ((user.name.toLowerCase().includes(searchInput.toLowerCase())) && (user.authID !== profile.authID));
    }





    if (currentMode === MODES.THREAD_OPEN || threadID) {
        return (
            <Thread profile={profile} threadID={threadID} setThreadID={setThreadID} setSearchInput={setSearchInput} />
        )

    }
    else if (currentMode === MODES.THREAD_CLOSED) {
        return (
            <MessengerModalContainer>
                <FlexBox>
                    <MessnegerSearchInput type="text" placeholder="🔎 search user" spellCheck="false"
                        value={searchInput} onChange={(event) => { setSearchInput(event.target.value) }} />
                </FlexBox>
                <Text onClick={() => { setThreadID(1) }}>
                    history, id 1
                </Text>
                <Text onClick={() => { setThreadID(2) }}>
                    history, id 2
                </Text>
            </MessengerModalContainer>
        )

    }
    else if (currentMode === MODES.THREAD_SEARCHING) {
        return (
            <MessengerModalContainer>
                <FlexBox>
                    <MessnegerSearchInput type="text" placeholder="🔎 search user" spellCheck="false"
                        value={searchInput} onChange={(event) => { setSearchInput(event.target.value) }} />
                </FlexBox>
                {
                    users.filter(usersFilteredByInput).map((user, index) => {
                        return (
                            <MessageSenderInfo>
                                <MessageProfileImage src={"/default_profile_picture.png"} alt={user.name} />

                                <Text key={user.authID} style={centerChilds} onClick={() => { setThreadID(getThreadId(profile.authID, user.authID)) }}>
                                    <BiHash />
                                    {user.name}
                                </Text>
                            </MessageSenderInfo>


                        )

                    })
                }
            </MessengerModalContainer>
        )
    }


}
