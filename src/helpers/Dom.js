/**
 * Created by intellicar-rinas on 13/7/17.
 */
const Dom = {

    Class(conditionMap, defaultClass = ""){
        let className = "";
        for(let name in conditionMap){
            if(conditionMap[name])
                className += name + " ";
        }
        return className + defaultClass;
    }

}


export default Dom;