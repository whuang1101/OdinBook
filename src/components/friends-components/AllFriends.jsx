import { motion } from "framer-motion";
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
const AllFriends=  ({setNotification}) => {
    
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
        }).then(
            response => {
                if (response.ok){
                    const updatedRequests = allFriends.filter((item) => item._id !== friendId);
                    setAllFriends(updatedRequests);
                    const current = {
                        status: true,
                        content: "Friend Removed Successfully"
                    };
                    setNotification(current);
                        setTimeout(() => {
                        const newStatus = {
                            status: false,
                            content: ""
                        };
                        setNotification(newStatus);
                    }, 3000);
                }
            }
        )
    }
    return(
        <>
        {allFriends.length === 0 ? !loading &&   <h4>Go add some friends on friend suggestions</h4>:
        <h2>All Friends</h2>}
         <div className="suggested-friends">
        {!loading ? allFriends.map((user) => (
            <Link to= {`/profile/${user._id}`} className="user-container" key={user._id}>
                <img src={user.image_url} alt="hey" className="friend-image"/>
                <div className="information-part">
                    <div className="friend-name">{user.name}</div>
                    <motion.button whileHover={{scale: 1.1}} whileTap={{scale: .9}} 
                    className="remove-friend"
                    onClick={(e) =>  {e.preventDefault();
                        {handleRemoveFriend(user._id)}}}
                    >Remove Friend</motion.button>
                </div>
            </Link>
        )): 
            
        (
            Array.from({ length: 8 }).map((_, index) => (
            
                <div className="user-container-skeleton" key={index}>
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