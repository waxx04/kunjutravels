/**
 * Created by intellicar-rinas on 10/8/17.
 */
import _ from 'lodash';

export const get = (key) => {
    let data = localStorage.getItem(key);
    try{
        data = JSON.parse(data);
    } catch (e) {
        // Parsing Failed
    }
    return data;
};

export const save = (key, data = "") => {
    try{
        data = JSON.stringify(data);
    } catch (e) {
        // Stringify Failed
    }
    localStorage.setItem(key, data);
};

export const getGroupChildren = (parentPaths, includeParent, groupMap) => {

    let tMap = [];
    let arr = [];

    for(let jdx in parentPaths){
        for(let path in groupMap){
            if(path.indexOf(parentPaths[jdx]) === 0){
                if(path !== parentPaths[jdx] || includeParent){
                    tMap[path] = groupMap[path]
                }
            }
        }
    }

    for(let idx in tMap){
        arr.push(tMap[idx]);
    }

    return _.cloneDeep(arr);
};

export const processPermissions = (permissions, includeParent, groupMap) => {
    for(let idx in permissions){
        permissions[idx].groups = getGroupChildren(permissions[idx].grouppaths, includeParent, groupMap);
    }
    return permissions;
};

export const getPolygonCentroid = (pts) => {
    let first = pts[0], last = pts[pts.length-1];
    if (first.x !== last.x || first.y !== last.y) pts.push(first);
    let twicearea=0,
        x=0, y=0,
        nPts = pts.length,
        p1, p2, f;
    for ( let i=0, j=nPts-1 ; i<nPts ; j=i++ ) {
        p1 = pts[i]; p2 = pts[j];
        f = p1.x*p2.y - p2.x*p1.y;
        twicearea += f;
        x += ( p1.x + p2.x ) * f;
        y += ( p1.y + p2.y ) * f;
    }
    f = twicearea * 3;
    return { x:x/f, y:y/f };
}

export const getPolygonCenter = (latLngs) => {
    let center = getPolygonCentroid(latLngs.map(latLng=>{
        return {x:latLng.lat(), y:latLng.lng()}
    }));
    return new window.google.maps.LatLng(center.x, center.y);
};