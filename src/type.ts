export type Product = {
    id: string;
    name: string;
    normalPrice: number;
    enabled: boolean;
    thresholdPrice?: number;
}

export type ProductToScrape = {
    productId: string;
    providerId: string;
    relativeUrl: string;
}

export type ProductPrice = {
    store: string;
    price: number;
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

