import { CouponModel } from "../Models/CouponModel";

export class CouponAppState {
        // Step 1 - create the app state object
        public purchases: CouponModel[] = [];
    }
    
    // Step 2 - define all required actions
    export enum ActionType {
        GOT_ALL_PURCHASES = "GOT_ALL_PURCHASES",
        GOT_SINGLE_PURCHASE = "GOT_SINGLE_PURCHASE",
        ADDED_PURCHASE = "ADDED_PURCHASE",
        UPDATED_PURCHASE = "UPDATED_PURCHASE",
        DELETED_PURCHASE = "DELETED_PURCHASE",
        REMOVED_PURCHASES = "REMOVED_PURCHASES"
    }
// Step 3 - define what is action in terms of data
export interface PurchaseAction {
    type: ActionType;
    payload: any;
}

// Step 4 - creator functions - gets payload regarding the action
export function gotAllPurchasesAction(purchases: CouponModel[]): PurchaseAction {
    return {
        type: ActionType.GOT_ALL_PURCHASES,
        payload: purchases
    };
}

export function gotSingleCouponAction(coupon: CouponModel): PurchaseAction {
    return {
        type: ActionType.GOT_SINGLE_PURCHASE,
        payload: coupon
    };
}

export function addedCouponAction(coupon: CouponModel): PurchaseAction {
    return {
        type: ActionType.ADDED_PURCHASE,
        payload: coupon
    };
}

export function updatedCouponAction(coupon: CouponModel): PurchaseAction {
    return {
        type: ActionType.UPDATED_PURCHASE,
        payload: coupon
    };
}

export function deletedCouponAction(id: number): PurchaseAction {
    return {
        type: ActionType.DELETED_PURCHASE,
        payload: id
    }
}

export function removePurchases(): PurchaseAction {
    return {
        type: ActionType.REMOVED_PURCHASES,
        payload: {}
    }
}

// Step 5 - Reducer function perform the required action
export function purchasesReducer(currentState: CouponAppState = new CouponAppState(),action:PurchaseAction): CouponAppState{

    const newState = {...currentState} //Spread Operator // Copy
    switch(action.type){
        case ActionType.GOT_ALL_PURCHASES: {
            newState.purchases = action.payload;
            break;
        }
        case ActionType.ADDED_PURCHASE:{
            newState.purchases.push(action.payload);
            break;
        }
        case ActionType.UPDATED_PURCHASE: {
            const idx = newState.purchases.findIndex(coupon => coupon.id === action.payload.id);
            newState.purchases[idx] = action.payload;
            break;
        }

        case ActionType.DELETED_PURCHASE: {
            newState.purchases = newState.purchases.filter(coupon => coupon.id !== action.payload);
            break;
        }
        case ActionType.REMOVED_PURCHASES: {
            newState.purchases = [];
            break;
        }

    }
    return newState;
}
