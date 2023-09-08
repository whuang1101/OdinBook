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
    return(
        <>
         <div className="suggested-friends">
        {!loading ? allFriends.map((user) => (
                <div className="user-container" key={user._id}>
                    <img src={user.image_url} alt="hey" className="friend-image"/>
                    <div className="information-part">
                        <div className="friend-name">{user.name}</div>

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