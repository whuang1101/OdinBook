import Header from "./Header"
import "../css/friends.css"
import Icon from '@mdi/react';
import { mdiAccountArrowLeft, mdiAccountArrowLeftOutline, mdiAccountMultiple, mdiAccountMultipleOutline, mdiAccountPlus, mdiAccountPlusOutline } from '@mdi/js';
import { useDispatch, useSelector } from "react-redux";
import { updateFriendSelection } from "../redux/friendSelectSlice";
import { useEffect } from "react";
import { updatePage } from "../redux/pageSlice";
import FriendSuggestions from "./friends-components/FriendSuggestions";
import FriendRequests from "./friends-components/FriendRequests";
import AllFriends from "./friends-components/AllFriends";


const Friends = ({setUser}) => {
    const friendSelection = useSelector(state => state.friendSelection);
    const dispatch = useDispatch();
    useEffect(() => 
    {
        dispatch(updatePage("friends"))
    }
    ,[])
    return (
        <div className="home-background">
        <Header setUser={setUser}/>
        <div className="bottom-screen">
            <div className="first-half">
            <div className="friend-toggle">
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
                <div className="friend-requests" onClick={() => dispatch(updateFriendSelection("Friend Requests"))}>
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
                <div className="friend-suggestions" onClick={() => dispatch(updateFriendSelection("Friend Suggestions"))}>
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
                <div className="all-friends" onClick={() => dispatch(updateFriendSelection("All Friends"))}>
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
                {friendSelection === "Friend Requests" && <FriendRequests/>}
                {friendSelection === "Friend Suggestions" && <FriendSuggestions/>}
                {friendSelection === "All Friends" && <AllFriends/>}
            </div>
        </div>
    </div>
    )
}
export default Friends