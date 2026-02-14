import { type Info, type Review } from './storage';
export type ParseResult = {
    company_info?: Info;
    company_reviews?: Review[];
    error?: string;
};
type FetchOptions = {
    apiKey: string;
    locale: string;
    limit: number;
    headers: Record<string, string>;
};
export declare class Parser {
    branchId: string;
    options: FetchOptions;
    constructor(branchId: string, options: FetchOptions);
    private buildUrl;
    private fetchPage;
    private mapReview;
    private mapInfo;
    fetchAll(): Promise<{
        info: Info;
        reviews: Review[];
    }>;
    parseAllData(): Promise<ParseResult>;
    parseCompanyInfo(): Promise<ParseResult>;
    parseReviews(): Promise<ParseResult>;
}
export {};
