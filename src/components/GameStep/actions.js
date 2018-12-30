import {STEP_INC, STEP_RELEASE} from "./constants";

export function updateCurrentStep(step){
    return{
        type: STEP_INC,
        step,
    }
}

export function releaseCurrentStep(){
    return{
        type: STEP_RELEASE,
    }
}
