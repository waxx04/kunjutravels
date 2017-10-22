/**
 * Created by intellicar-rinas on 9/8/17.
 */
const apiHelper = {

    validateResponse: (resp) => {
        if(resp && resp.data && resp.data.data != null){
            return resp.data.data;
        }
        return resp;
    },

    validateFailure: (resp) => {
        if(!(resp && resp.message === 0)){
            return Promise.reject(resp);
        }else{
            return Promise.reject(0);
        }
    },

};

export default apiHelper;


export const handleGetAlarmHistory = function(resp){

    for(let idx in resp){
        for(let jdx in resp[idx].standard){
            if(resp[idx].standard[jdx].alarmtype === "Over_speed_Start"){
                resp[idx].standard[jdx].alarmtype = "OVERSPEED";
            }
        }
    }

    return resp;
};