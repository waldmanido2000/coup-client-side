import { CouponModel } from "../Models/CouponModel";

export class CouponAppState {
        // Step 1 - create the app state object
        public coupons: CouponModel[] = [];
    }
    
    // Step 2 - define all required actions
    export enum ActionType {
        GOT_ALL_COUPONS = "GOT_ALL_COUPONS",
        GOT_SINGLE_COUPON = "GOT_SINGLE_COUPON",
        ADDED_COUPON = "ADDED_COUPON",
        UPDATED_COUPON = "UPDATED_COUPON",
        DELETED_COUPON = "DELETED_COUPON",
        REMOVED_COUPONS = "REMOVED_COUPONS"
    }
// Step 3 - define what is action in terms of data
export interface CouponAction {
    type: ActionType;
    payload: any;
}

// Step 4 - creator functions - gets payload regarding the action
export function gotAllCouponsAction(coupons: CouponModel[]): CouponAction {
    return {
        type: ActionType.GOT_ALL_COUPONS,
        payload: coupons
    };
}

export function gotSingleCouponAction(coupon: CouponModel): CouponAction {
    return {
        type: ActionType.GOT_SINGLE_COUPON,
        payload: coupon
    };
}

export function addedCouponAction(coupon: CouponModel): CouponAction {
    return {
        type: ActionType.ADDED_COUPON,
        payload: coupon
    };
}

export function updatedCouponAction(coupon: CouponModel): CouponAction {
    return {
        type: ActionType.UPDATED_COUPON,
        payload: coupon
    };
}

export function deletedCouponAction(id: number): CouponAction {
    return {
        type: ActionType.DELETED_COUPON,
        payload: id
    }
}

export function removeCoupons(): CouponAction {
    return {
        type: ActionType.REMOVED_COUPONS,
        payload: {}
    }
}

// Step 5 - Reducer function perform the required action
export function couponsReducer(currentState: CouponAppState = new CouponAppState(),action:CouponAction): CouponAppState{

    const newState = {...currentState} //Spread Operator // Copy
    switch(action.type){
        case ActionType.GOT_ALL_COUPONS: {
            newState.coupons = action.payload;
            break;
        }
        case ActionType.ADDED_COUPON:{
            newState.coupons.push(action.payload);
            break;
        }
        case ActionType.UPDATED_COUPON: {
            const idx = newState.coupons.findIndex(coupon => coupon.id === action.payload.id);
            newState.coupons[idx] = action.payload;
            break;
        }

        case ActionType.DELETED_COUPON: {
            newState.coupons = newState.coupons.filter(coupon => coupon.id !== action.payload);
            break;
        }
        case ActionType.REMOVED_COUPONS: {
            newState.coupons = [];
            break;
        }

    }
    return newState;
}
