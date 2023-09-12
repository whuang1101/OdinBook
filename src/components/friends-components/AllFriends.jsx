import { motion } from "framer-motion";
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux"
const AllFriends=  () => {
    
    const host = useSelector(state=> state.host);
    const user = useSelector(state=> state.user);
    const [allFriends, setAllFriends] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
      fetch(`${host}/friends/${user._id}`).then(
        response =>{
            if(response.ok){
                return response.json()
            }
        }
      ).then(
        data => {
            setLoading(false)
            setAllFriends(data);
        }
      )
    },[])
    const handleRemoveFriend = (friendId) => {
        const body = {
            friendId:friendId,
            selfId: user._id,
        }
        fetch(`${host}/users/friend/remove`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
    }
    return(
        <>
         <div className="suggested-friends">
        {!loading ? allFriends.map((user) => (
            <div className="user-container" key={user._id}>
                <img src={user.image_url} alt="hey" className="friend-image"/>
                <div className="information-part">
                    <div className="friend-name">{user.name}</div>
                    <motion.button whileHover={{scale: 1.1}} whileTap={{scale: .9}} 
                    className="remove-friend"
                    onClick={() => {handleRemoveFriend(user._id)}}
                    >Remove Friend</motion.button>
                </div>
            </div>
        )): 
            
        (
            Array.from({ length: 8 }).map((_, index) => (
            
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
export default AllFriends