import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import { useSelector } from "react-redux"
const FriendSuggestions = () => {
    const host = useSelector(state =>  state.host)
    const user = useSelector(state => state.user)
    const [allSuggestions, setAllSuggestions] = useState([]);
    const [loading, setLoading] = useState(true)
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
            let updatedList = [... allSuggestions];
            updatedList = updatedList.map( item => {
                if (item._id === recipientId) {
                    return { ...item, isRequested: true };
                } else {
                    return item;
                }
            })
            setAllSuggestions(updatedList)
        }).catch((err) => {
            console.log(err)
        })
    }
    const handleCancelRequest = (recipientId) => {
            const body = {
                recipientId: recipientId,
                senderId: user._id
            }
            fetch(`${host}/friends/remove`,{
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
                let updatedList = [... allSuggestions];
                updatedList = updatedList.map( item => {
                    if (item._id === recipientId) {
                        return { ...item, isRequested: false };
                    } else {
                        return item;
                    }
                })
                setAllSuggestions(updatedList)
            }).catch((err) => {
                console.log(err)
            })
        
  
    }
    useEffect(() => {
        fetch(`${host}/friends/suggestions/${user._id}`)
        .then(response => 
            {if(response.ok){
                return response.json()
            }}
            ).then(
                data =>
                {const modifiedData = data.map(item => ({ ...item, isRequested: false }));
                setAllSuggestions(modifiedData)
                setLoading(false)
            }
            )
        .catch((err) =>{
            console.log(err)}
            )
    },[])
    return(
        <>
            {allSuggestions.length !== 0 &&
            <h2>Friend Suggestions</h2>
            }
            <div className="suggested-friends">
            {!loading ? allSuggestions.map((user) => (
                <div className="user-container" key={user._id}>
                    <img src={user.image_url} alt="hey" className="friend-image"/>
                    <div className="information-part">
                        <div className="suggestion-name">{user.name}</div>
                        {!user.isRequested ?
                        <motion.button 
                        whileHover= {{scale:1.1}}
                        whileTap= {{scale:.9}}
                        className="add-friend-button" 
                        onClick={() => handleAddFriend(user._id)}>
                            Add Friend
                        </motion.button>
                        :
                        <motion.button
                        whileHover={{scale: 1.1}}
                        whileTap= {{scale:.9}} 
                        className="cancel-request-button"
                        onClick={() => handleCancelRequest(user._id)}>
                        Cancel Request
                        </motion.button>} 
                    </div>
                </div>
            )):
            (
                Array.from({ length: 6 }).map((_, index) => (
                    <div className="user-container" key={index}>
                        <div className="friend-image">
                            <Skeleton height={"100%"} borderRadius={"1em"}/>
                        </div>
                    </div>
                  ))
              
            )}
            </div>
        </>
    )
}
export default FriendSuggestions