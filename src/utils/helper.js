export const minutesToHours= (min)=>{
    const hour= Math.floor(min/60)
    const mins=min%60;

    return `${hour}h ${mins}m`
}

export const ratingToPercentage= (rating)=>{
    return (rating*10)?.toFixed(0)
}


export const resolveRatingColor=(rating)=>{
    if(rating>=7){
        return "green.400"
    }else if(rating>=5){
        return 'orange.400'
    }else{
        return 'red.400'
    }
}