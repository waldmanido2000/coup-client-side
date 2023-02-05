import { CustomerModel } from "../Models/CustomerModel";

export class CustomerAppState {
        // Step 1 - create the app state object
        public customers: CustomerModel[] = [];
    }
    
    // Step 2 - define all required actions
    export enum ActionType {
        GOT_ALL_CUSTOMERS = "GOT_ALL_CUSTOMERS",
        GOT_SINGLE_CUSTOMER = "GOT_SINGLE_CUSTOMER",
        ADDED_CUSTOMER = "ADDED_CUSTOMER",
        UPDATED_CUSTOMER = "UPDATED_CUSTOMER",
        DELETED_CUSTOMER = "DELETED_CUSTOMER",
        REMOVED_CUSTOMERS = "REMOVED_CUSTOMERS"
    }
// Step 3 - define what is action in terms of data
export interface CustomerAction {
    type: ActionType;
    payload: any;
}

// Step 4 - creator functions - gets payload regarding the action
export function gotAllCustomersAction(customers: CustomerModel[]): CustomerAction {
    return {
        type: ActionType.GOT_ALL_CUSTOMERS,
        payload: customers
    };
}

export function gotSingleCustomerAction(customer: CustomerModel): CustomerAction {
    return {
        type: ActionType.GOT_SINGLE_CUSTOMER,
        payload: customer
    };
}

export function addedCustomerAction(customer: CustomerModel): CustomerAction {
    return {
        type: ActionType.ADDED_CUSTOMER,
        payload: customer
    };
}

export function updatedCustomerAction(customer: CustomerModel): CustomerAction {
    return {
        type: ActionType.UPDATED_CUSTOMER,
        payload: customer
    };
}

export function deletedCustomerAction(id: number): CustomerAction {
    return {
        type: ActionType.DELETED_CUSTOMER,
        payload: id
    }
}

export function removeCustomers(): CustomerAction {
    return {
        type: ActionType.REMOVED_CUSTOMERS,
        payload: {}
    }
}

// Step 5 - Reducer function perform the required action
export function customersReducer(currentState: CustomerAppState = new CustomerAppState(),action:CustomerAction): CustomerAppState{

    const newState = {...currentState} //Spread Operator // Copy
    switch(action.type){
        case ActionType.GOT_ALL_CUSTOMERS: {
            newState.customers = action.payload;
            break;
        }
        case ActionType.ADDED_CUSTOMER:{
            newState.customers.push(action.payload);
            break;
        }
        case ActionType.UPDATED_CUSTOMER: {
            const idx = newState.customers.findIndex(customer => customer.id === action.payload.id);
            newState.customers[idx] = action.payload;
            break;
        }

        case ActionType.DELETED_CUSTOMER: {
            newState.customers = newState.customers.filter(customer => customer.id !== action.payload);
            break;
        }
        case ActionType.REMOVED_CUSTOMERS: {
            newState.customers = [];
            break;
        }

    }
    return newState;
}
