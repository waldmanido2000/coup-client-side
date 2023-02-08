 export interface CouponModel {
        id: number;
        category: string;
        title: string;
        description: string;
        startDate: string;
        endDate: string;
        amount: number;
        price: number;
        image: string;
    }
    
    export interface CouponPayloadModel {
        category: string;
        title: string;
        description: string;
        startDate: string;
        endDate: string;
        amount: number;
        price: number;
        image: string;
    }