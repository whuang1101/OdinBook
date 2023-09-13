import { motion } from "framer-motion";
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const FriendRequests = ({setNotification}) => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [incomingRequests, setIncomingRequests] = useState([]);
    const host = useSelector(state => state.host)
    const user = useSelector(state => state.user)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch(`${host}/friends/pending/${user._id}`)
        .then(response =>{
            if(response.ok){
                return response.json()
            }
            else{
                console.log(response.status)
            }
        }).then((data)=>
            {
            const modifiedData = data.map(item => ({ ...item, isRequested: true }));
            setPendingRequests(modifiedData)
            setLoading(false)
        }
        )
        fetch(`${host}/friends/request/${user._id}`)
        .then(response =>{
            if(response.ok){
                return response.json()
            }
            else{
                console.log(response.status)
            }
        }).then((data)=>
            {
                setIncomingRequests(data)
        }
        )
    },[])
    const handleAddFriend = (recipientId) => {
        const body = {
            recipientId: recipientId,
            senderId: user._id
        }
        fetch(`${host}/friends/add`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(body),
        }).then(response =>{
            if (response.ok){
                return response.json()     
            }
            else{
                console.log("not saved")
            }
        }
        ).then(() => {
            let updatedList = [... pendingRequests];
            updatedList = updatedList.map( item => {
                if (item.recipient._id === recipientId) {
                    return { ...item, isRequested: true };
                } else {
                    return item;
                }
            })
            setPendingRequests(updatedList)
        }).catch((err) => {
            console.log(err)
        })
    }
    const handleCancelRequest = (requestId, recipientId) => {
            const body = {
                recipientId: requestId,
            }
            fetch(`${host}/friends/cancel/request`,{
                method: "DELETE",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(body),
            }).then(response =>{
                if (response.ok){
                    return response.json()     
                }
                else{
                    console.log("not saved")
                }
            }
            ).then(() => {
                let updatedList = [... pendingRequests];
                updatedList = updatedList.map( item => {
                    if (item.recipient._id === recipientId) {
                        return { ...item, isRequested: false };
                    } else {
                        return item;
                    }
                })
                const updatedRequests = incomingRequests.filter((item) => item._id !== requestId);
                setIncomingRequests(updatedRequests); 
                setPendingRequests(updatedList)
            }).catch((err) => {
                console.log(err)
            })
        
  
    }

    const handleAcceptFriend = (postId) => {
        const body = {
            id: postId
        }
        fetch(`${host}/friends/request/accept`,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(
            response => 
            {if(response.ok)
            {
                console.log("success")
                const updatedRequests = incomingRequests.filter((item) => item._id !== postId);
                setIncomingRequests(updatedRequests); 
                const current = {
                    status: true,
                    content: "Friend Added Successfully!"
                };
                setNotification(current);
                    setTimeout(() => {
                    const newStatus = {
                        status: false,
                        content: ""
                    };
                    setNotification(newStatus);
                }, 3000);
            }}
        )
    }
    return (
        <>
        {incomingRequests.length !== 0 || !loading ?
        <>
        {incomingRequests.length !== 0 &&
        <h2>Friend Requests</h2>
        }
            <div className="incoming-requests">
            {incomingRequests && incomingRequests.map((request) => (
                    <div className="request-container" key={request.sender._id}>
                        <Link to ={`/profile/${user._id}`}><img src={request.sender.image_url} alt="hey" className="friend-image"/></Link>
                        <div className="information-part">
                            <Link to ={`/profile/${user._id}`} className="suggestion-name">{request.sender.name}</Link>
                            <motion.button 
                            whileHover= {{scale:1.1}}
                            whileTap= {{scale:.9}}
                            className="confirm-friend-button"
                            onClick={() => {handleAcceptFriend(request._id)}}
                            > 
                                Confirm
                            </motion.button>
                            <motion.button 
                            whileHover= {{scale:1.1}}
                            whileTap= {{scale:.9}}
                            className="remove-request-button"
                            onClick={() => {handleCancelRequest(request._id, request.recipient._id)}}
                            > 
                                Cancel Request
                            </motion.button>
                        </div>
                    </div>
                ))}
            </div>
        </>:
        (
            <div className="incoming-requests">
                {Array.from({ length: 8 }).map((_, index) => (
                
                    <div className="user-container-skeleton" key={index}>
                        <div className="friend-image">
                            <Skeleton height={"100%"} borderRadius={"1em"}/>
                        </div>
                    </div>
                    ))}
            </div>
        )
        }
        {pendingRequests.length !== 0 &&
        <>
        <h2>Pending Requests</h2>
        <div className="pending-friends">
         {pendingRequests && pendingRequests.length !== 0 && pendingRequests.map((request) => (
                <div className="request-container" key={request.recipient._id}>
                    <Link to ={`/profile/${request.recipient._id}`}><img src={request.recipient.image_url} alt="hey" className="friend-image"/></Link>
                    <div className="information-part">
                        <Link to={`/profile/${request.recipient._id}`} className="suggestion-name">{request.recipient.name}</Link>
                        {!request.isRequested ?
                        <motion.button 
                        whileHover= {{scale:1.1}}
                        whileTap= {{scale:.9}}
                        className="add-friend-button"
                        onClick={() => {handleAddFriend(request.recipient._id)}}> 
                            Add Friend
                        </motion.button>
                        :
                        <motion.button
                        whileHover={{scale: 1.1}}
                        whileTap= {{scale:.9}} 
                        className="cancel-request-button"
                        onClick={() => {handleCancelRequest(request._id, request.recipient._id)}}>
                        Cancel Request
                        </motion.button>} 
                    </div>
                </div>
            ))}
        </div>
        </>
        }
        {pendingRequests.length === 0 && incomingRequests.length === 0 && !loading &&  
        <h4>You don't currently have any pending or incoming requests. Go to Friends Suggestions to add some!</h4>
        }
        </>
    )
}
export default FriendRequests