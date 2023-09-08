import { motion } from "framer-motion";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const AllFriends=  () => {
    
    const host = useSelector(state=> state.host);
    const user = useSelector(state=> state.user);
    const [allFriends, setAllFriends] = useState([])
    useEffect(()=>{
      fetch(`${host}/friends/${user._id}`).then(
        response =>{
            if(response.ok){
                return response.json()
            }
        }
      ).then(
        data => {
            setAllFriends(data);
        }
      )
    },[])
    return(
        <>
         <div className="suggested-friends">
        {allFriends.length !== 0 && allFriends.map((user) => (
                <div className="user-container" key={user._id}>
                    <img src={user.image_url} alt="hey" className="friend-image"/>
                    <div className="information-part">
                        <div className="friend-name">{user.name}</div>

                    </div>
                </div>
            ))}
            </div>
        </>
    )
}
export default AllFriends