import { Parser } from './parsers';
const defaultHeaders = {
    accept: 'application/json, text/plain, */*',
    'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    origin: 'https://2gis.ru',
    referer: 'https://2gis.ru/',
    'sec-ch-ua': '"Not(A:Brand";v="8", "Chromium";v="144", "Google Chrome";v="144"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
};
export class TwoGisParser {
    constructor(branchId, options = {}) {
        this.branchId = String(branchId);
        const envKey = process.env.TWO_GIS_API_KEY || process.env.TWOGIS_API_KEY;
        this.apiKey = options.apiKey || envKey || '';
        this.locale = options.locale || 'ru_RU';
        this.limit = options.limit || 50;
        this.headers = { ...defaultHeaders, ...(options.headers || {}) };
    }
    createParser() {
        if (!this.apiKey) {
            throw new Error('2GIS API key is required. Pass { apiKey } or set TWO_GIS_API_KEY.');
        }
        return new Parser(this.branchId, {
            apiKey: this.apiKey,
            locale: this.locale,
            limit: this.limit,
            headers: this.headers,
        });
    }
    async parse(typeParse = 'default') {
        const parser = this.createParser();
        try {
            if (typeParse === 'default') {
                return await parser.parseAllData();
            }
            if (typeParse === 'company') {
                return await parser.parseCompanyInfo();
            }
            if (typeParse === 'reviews') {
                return await parser.parseReviews();
            }
            return {};
        }
        catch (error) {
            console.error(error);
            return { error: 'Страница не найдена' };
        }
    }
}
