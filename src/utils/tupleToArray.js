import {languages} from "./constants";

export default function tupleToArray(){
    const arr = [];

    for(let value in languages){
        arr.push(languages[value]);
    }
    return arr;
}
