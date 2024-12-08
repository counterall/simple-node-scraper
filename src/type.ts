export type Product = {
    id: string;
    name: string;
    type: string;
    enabled: boolean;
    normalPrice: number;
    thresholdPrice?: number;
}

export type ProductToScrape = {
    productId: string;
    providerId: string;
    appId?: string;
    relativeUrl?: string;
}

export type ProductPrice = {
    store: string;
    price: number;
    initialPrice?: number;
    discount?: string;
}

export type Provider = {
    id: string;
    name: string;
    baseUrl: string;
    enabled: string;
}

export type Notification = {
    product: string;
    normalPrice: number;
    providers: ProductPrice[];
}

