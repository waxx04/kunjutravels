/**
 * Created by intellicar-rinas on 15/7/17.
 */
import axios from 'axios';
import {get} from './helperFunctions';

let reqMap = {};

const newReqMap = (uid) => {
    return reqMap[uid] = axios.CancelToken.source();
};

const checkReq = (uid) => {
    if(uid in reqMap){
       reqMap[uid].cancel(0);
    }
    return newReqMap(uid)
};

const $http = {

    post: function (api, params = {}, config = {}, uid = "NO_UID") {
        const auth = get("auth");

        if(auth && api.indexOf("gettoken") === -1){
            params.token = auth.token;
        }

        if(uid !== "NO_UID"){
            config.cancelToken = checkReq(uid + api).token;
            // console.log(config);
        }
        return axios.post(api, params, config);
    },

    geo: function (api, params = {}, config = {}, uid = "NO_UID") {
        const auth = get("auth");

        if(auth && api.indexOf("gettoken") === -1){
            params.token = auth.token;
        }

        if(uid !== "NO_UID"){
            config.cancelToken = checkReq(uid + api).token;
            // console.log(config);
        }
        return axios.post(api, params, config);
    }

};

export default $http;