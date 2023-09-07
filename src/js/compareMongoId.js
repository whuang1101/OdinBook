function compareMongo (userId,likesArray) {
    for(const id2 of likesArray)
    { 
        if(userId===id2){
        return true;
    }
}
    return false
}

export default compareMongo