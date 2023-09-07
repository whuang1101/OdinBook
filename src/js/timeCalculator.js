function timeCalculator (date) {
    const inputDate = new Date(date)
    const currentDate = new Date();
    const timeDifference = (currentDate-inputDate)/1000;
    if(timeDifference < 3600){
        return(Math.round(timeDifference/60) + "m ago")
    }
    else if(timeDifference < 86400){
        return (Math.round(timeDifference/60/60) + "h ago");
    }
    else {
        return (Math.round(timeDifference/60/60/24)+ "d ago")
    }
    
}
export default timeCalculator