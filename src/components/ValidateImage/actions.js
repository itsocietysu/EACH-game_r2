import {IMAGE_COMPARE, IMAGE_COMPARE_SUCCESS, IMAGE_COMPARE_ERROR} from "./constants";

export function imageCompare(body){
    return{
        type: IMAGE_COMPARE,
        body,
    }
}

/**
 * Dispatched when museum data is loaded by the request saga
 *
 * @param  {array} museums The current museums
 *
 * @return {object} An action object with a type of LOAD_MUSEUMS_SUCCESS passing feeds data
 */
export function imageCompareFinished(result) {
    return {
        type: IMAGE_COMPARE_SUCCESS,
        result,
    };
}

/**
 * Dispatched when loading museums data fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_MUSEUMS_ERROR passing the error
 */
export function imageComparisonError(error) {
    return {
        type: IMAGE_COMPARE_ERROR,
        error,
    };
}
