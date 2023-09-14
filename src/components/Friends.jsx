import Header from "./Header"
import "../css/friends.css"
import Icon from '@mdi/react';
import { mdiAccountArrowLeft, mdiAccountArrowLeftOutline, mdiAccountMultiple, mdiAccountMultipleOutline, mdiAccountPlus, mdiAccountPlusOutline, mdiAlphaXBox, mdiAlphaXBoxOutline, mdiMicrosoftXboxControllerMenu } from '@mdi/js';
import { useDispatch, useSelector } from "react-redux";
import { updateFriendSelection } from "../redux/friendSelectSlice";
import { useEffect, useState } from "react";
import { updatePage } from "../redux/pageSlice";
import FriendSuggestions from "./friends-components/FriendSuggestions";
import FriendRequests from "./friends-components/FriendRequests";
import AllFriends from "./friends-components/AllFriends";
import Notification from "./Notification";

const Friends = ({setUser}) => {
    const friendSelection = useSelector(state => state.friendSelection);
    const dispatch = useDispatch();
    const [notification, setNotification] = useState({
        status: false,
        content: ""
    });
    useEffect(() => 
    {
        dispatch(updatePage("friends"))
    }
    ,[])
    const handleFriendDropDown = () => {
        console.log("hi")
        const firstHalf = document.querySelector(".first-half");
        firstHalf.classList.add("present");
        const friendDisplay =  document.querySelector(".friend-display");
        friendDisplay.classList.add("hide");
    }
    const handleFriendClose = () => {
        const firstHalf = document.querySelector(".first-half");
        firstHalf.classList.remove("present");
        const friendDisplay =  document.querySelector(".friend-display");
        friendDisplay.classList.remove("hide");
    }
    return (
        <div className="home-background">
        {notification.status &&
        <Notification content={notification.content}/>}
        <Header setUser={setUser}/>
        <div className="bottom-screen">
            <div className="first-half">
            <div className="friend-toggle">
                <Icon path={mdiAlphaXBoxOutline} size={1} className="close-icon" onClick= {() => handleFriendClose()}/>
                <h1 className="friend-title">Friends</h1>
                {friendSelection === "Friend Requests" ?
                <div className="friend-requests focus">
                    <div className="focus-icon-outline">
                        <Icon path={mdiAccountArrowLeft} size={1} color={"white"}/>
                    </div>
                    <div>
                        Friend Requests
                    </div>
                </div> :
                <div className="friend-requests" onClick={() => {dispatch(updateFriendSelection("Friend Requests")), handleFriendClose()}}
                onKeyDown={(e) => {if (e.key === "Enter") {dispatch(updateFriendSelection("Friend Requests")), handleFriendClose()}}} tabIndex={0}>
                    <div className="icon-outline">
                        <Icon path={mdiAccountArrowLeftOutline} size={1} />
                    </div>
                    <div>
                        Friend Requests
                    </div>
                </div> 
                }
                {friendSelection === "Friend Suggestions" ?
                <div className="friend-suggestions focus">
                    <div className="focus-icon-outline">
                        <Icon path={mdiAccountPlus} size={1} color={"white"} />
                    </div>
                    <div>
                        Friend Suggestions
                    </div>
                </div>:
                <div className="friend-suggestions" onClick={() => {dispatch(updateFriendSelection("Friend Suggestions")),
                handleFriendClose()}}
                onKeyDown={(e) => {if (e.key === "Enter") {dispatch(updateFriendSelection("Friend Suggestions")), handleFriendClose()}}} tabIndex={0}>
                <div className="icon-outline">
                    <Icon path={mdiAccountPlusOutline} size={1} />
                </div>
                <div>
                    Friend Suggestions
                </div>
            </div>
                }
                 {friendSelection === "All Friends" ?
                <div className="all-friends focus">
                    <div className="focus-icon-outline">
                        <Icon path={mdiAccountMultiple} size={1} color={"white"}/>
                    </div>
                    <div>
                        All Friends
                    </div>
                </div>:
                <div className="all-friends" onClick={() => {dispatch(updateFriendSelection("All Friends")), handleFriendClose()}}
                onKeyDown={(e) => {if (e.key === "Enter") {dispatch(updateFriendSelection("All Friends")), handleFriendClose()}}} tabIndex={0}>
                <div className="icon-outline">
                    <Icon path={mdiAccountMultipleOutline} size={1} />
                </div>
                <div>
                    All Friends
                </div>
            </div>

                }
            </div>
            </div>
            <div className="friend-display">
                <Icon path={mdiMicrosoftXboxControllerMenu} size={1.5} className="friends-dropdown" onClick = {() => handleFriendDropDown()}/>
                {friendSelection === "Friend Requests" && <FriendRequests setNotification={setNotification}/>}
                {friendSelection === "Friend Suggestions" && <FriendSuggestions/>}
                {friendSelection === "All Friends" && <AllFriends setNotification={setNotification}/>}
            </div>
        </div>
    </div>
    )
}
export default Friends