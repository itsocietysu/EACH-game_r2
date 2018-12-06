import {IMAGE_COMPARE, IMAGE_COMPARE_SUCCESS, IMAGE_COMPARE_ERROR} from "./constants";

export function imageCompare(body){
    return{
        type: IMAGE_COMPARE,
        body,
    }
}

export function imageCompareFinished(result) {
    return {
        type: IMAGE_COMPARE_SUCCESS,
        result,
    };
}

export function imageComparisonError(error) {
    return {
        type: IMAGE_COMPARE_ERROR,
        error,
    };
}
