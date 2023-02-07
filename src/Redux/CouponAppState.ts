import { CouponModel } from "../Models/CouponModel";

export class CouponAppState {
        // Step 1 - create the app state object
        public coupons: CouponModel[] = [];
    }
    
    // Step 2 - define all required actions
    export enum ActionType {
        GOT_ALL_Coupons = "GOT_ALL_Coupons",
        GOT_SINGLE_Coupon = "GOT_SINGLE_Coupon",
        ADDED_Coupon = "ADDED_Coupon",
        UPDATED_Coupon = "UPDATED_Coupon",
        DELETED_Coupon = "DELETED_Coupon",
        REMOVED_Coupons ="REMOVED_Coupons"
    }
    
    // Step 3 - define what is action in terms of data
    export interface CouponAction {
        type: ActionType;
        payload: any;
    }
    
    // Step 4 - creator functions - gets payload regarding the action
    export function gotAllCouponsAction(coupons: CouponModel[]): CouponAction {
        return {
            type: ActionType.GOT_ALL_Coupons,
            payload: coupons
        };
    }
    
    export function gotSingleCouponAction(coupon: CouponModel): CouponAction {
        return {
            type: ActionType.GOT_SINGLE_Coupon,
            payload: coupon
        };
    }
    
    export function addedCouponAction(coupon: CouponModel): CouponAction {
        return {
            type: ActionType.ADDED_Coupon,
            payload: coupon
        };
    }
    
    export function updatedCouponAction(coupon: CouponModel): CouponAction {
        return {
            type: ActionType.UPDATED_Coupon,
            payload: coupon
        };
    }
    
    export function deletedCouponAction(id: number): CouponAction {
        return {
            type: ActionType.DELETED_Coupon,
            payload: id
        }
    }
    
    export function removeCoupons(): CouponAction {
        return {
            type: ActionType.REMOVED_Coupons,
            payload: {}
        }
    }
    
    // Step 5 - Reducer function perform the required action
    export function couponsReducer(currentState: CouponAppState = new CouponAppState(),action:CouponAction): CouponAppState{
    
    
        const newState = {...currentState} //Spread Operator // Copy
        switch(action.type){
            case ActionType.GOT_ALL_Coupons: {
                newState.coupons = action.payload;
                break;
            }
            case ActionType.ADDED_Coupon:{
                newState.coupons.push(action.payload);
                break;
            }
            case ActionType.UPDATED_Coupon: {
                console.log(newState.coupons);
                const idx = newState.coupons.findIndex(coupon => coupon.id === action.payload.id);
                newState.coupons[idx] = action.payload;
                console.log(newState.coupons);
                break;
            }
    
            case ActionType.DELETED_Coupon: {
                newState.coupons = newState.coupons.filter(coupon => coupon.id !== action.payload);
                break;
            }
            case ActionType.REMOVED_Coupons: {
                newState.coupons = [];
                break;
            }
    
    
        }
        return newState;
    

}