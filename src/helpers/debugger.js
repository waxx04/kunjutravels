/**
 * Created by intellicar-rinas on 17/10/17.
 */

let config = {
    trackTime:false,
};

if(!('trackTimeStats' in window)) {
    window.trackTimeStats = {};
}

if(!('trackTimeColorStats' in window)) {
    window.trackTimeColorStats = {};
}

let colorMap = ['#3A7CFF', '#3fba45', '#b32509', '#8e326a', '#8dc100', '#320b58', '#035a64', ];

const getRandomColor = () => {
    return colorMap[Math.floor(Math.random() * colorMap.length)];
};

export const trackTime = (key, force=false)=> {
    if(key in window.trackTimeStats){
        if(config.trackTime === true || force){
            console.log("%cTrack Time : " + key +" : " + (Date.now() - window.trackTimeStats[key]) + "ms", 'color:'+ window.trackTimeColorStats[key] +'; font-weight:bold')
            delete window.trackTimeStats[key];
        }
    }else{
        if(config.trackTime === true || force){
            window.trackTimeStats[key]=Date.now();
            if(!(key in window.trackTimeColorStats)){
                window.trackTimeColorStats[key]=getRandomColor();
            }
        }
    }
};