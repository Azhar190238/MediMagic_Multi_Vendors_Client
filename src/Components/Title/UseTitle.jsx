import { useEffect } from "react";


const UseTitle = (title) => {
    useEffect(()=>{
        document.title=`ThoughtLearn| ${title}`
    },[])
};

export default UseTitle;