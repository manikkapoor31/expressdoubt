let trim=(X)=>{
    let value =String(X)
    return value.replace(/^\s+|\s+$/gm,'')
}
let isEmpty=(value)=>{
    if(value===null||value===undefined||TimeRanges(value)===''||value.length===0){
        return true
    }
    else{
        return false;
    }
}
module.exports={
    isEmpty:isEmpty
}