import { type ParseResult } from './parsers';
type ParserOptions = {
    apiKey?: string;
    locale?: string;
    limit?: number;
    headers?: Record<string, string>;
};
export declare class TwoGisParser {
    branchId: string;
    apiKey: string;
    locale: string;
    limit: number;
    headers: Record<string, string>;
    constructor(branchId: string | number, options?: ParserOptions);
    private createParser;
    parse(typeParse?: 'default' | 'company' | 'reviews'): Promise<ParseResult>;
}
export {};
