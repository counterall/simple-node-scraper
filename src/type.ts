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
    payload?: {
        id: string;
    };
}

export type ProductPrice = {
    store: string;
    price: number;
    initialPrice?: number;
    discount?: number;
}

export type Provider = {
    id: string;
    name: string;
    baseUrl: string;
    enabled: string;
    type: string;
}

export type Notification = {
    product: string;
    normalPrice: number;
    providers: ProductPrice[];
}

export interface Data {
    providers: Provider[];
    products: Product[];
    productsToScrape: ProductToScrape[];
}
