import { createInfo, createReview, type Info, type Review } from './storage';
import { formDate, pickFirstNonEmpty } from './helpers';

export type ParseResult = {
  company_info?: Info;
  company_reviews?: Review[];
  error?: string;
};

type ReviewsResponse = {
  meta?: {
    branch_rating?: number;
    branch_reviews_count?: number;
    total_count?: number;
  };
  reviews?: Array<{
    id?: string | number;
    date_created?: string;
    rating?: number;
    text?: string;
    official_answer?: { text?: string } | string | null;
    user?: {
      name?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      photo_preview_urls?: {
        url?: string;
        '64x64'?: string;
        '320x'?: string;
        '640x'?: string;
        '1920x'?: string;
      } | null;
    } | null;
  }>;
};

type FetchOptions = {
  apiKey: string;
  locale: string;
  limit: number;
  headers: Record<string, string>;
};

export class Parser {
  branchId: string;
  options: FetchOptions;

  constructor(branchId: string, options: FetchOptions) {
    this.branchId = branchId;
    this.options = options;
  }

  private buildUrl(offset: number): string {
    const params = new URLSearchParams({
      limit: String(this.options.limit),
      offset: String(offset),
      is_advertiser: 'false',
      fields:
        'meta.providers,meta.branch_rating,meta.branch_reviews_count,meta.total_count,reviews.id,reviews.hiding_reason,reviews.emojis,reviews.trust_factors',
      without_my_first_review: 'false',
      rated: 'true',
      sort_by: 'friends',
      key: this.options.apiKey,
      locale: this.options.locale,
    });
    return `https://public-api.reviews.2gis.com/3.0/branches/${this.branchId}/reviews?${params.toString()}`;
  }

  private async fetchPage(offset: number): Promise<ReviewsResponse> {
    const response = await fetch(this.buildUrl(offset), {
      method: 'GET',
      headers: this.options.headers,
    });

    if (!response.ok) {
      throw new Error(`2GIS API error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as ReviewsResponse;
  }

  private mapReview(review: NonNullable<ReviewsResponse['reviews']>[number]): Review {
    const user = review.user || null;
    const photo = user?.photo_preview_urls || null;
    const name = pickFirstNonEmpty(
      user?.name ?? null,
      user?.first_name ? `${user.first_name}${user.last_name ? ` ${user.last_name}` : ''}` : null
    );
    const iconHref = pickFirstNonEmpty(
      photo?.url,
      photo?.['64x64'],
      photo?.['320x'],
      photo?.['640x'],
      photo?.['1920x']
    );

    let answer: string | null = null;
    if (typeof review.official_answer === 'string') {
      answer = review.official_answer;
    } else if (review.official_answer && typeof review.official_answer.text === 'string') {
      answer = review.official_answer.text;
    }

    const reviewId = review.id != null ? String(review.id) : null;
    const link =
      reviewId != null
        ? `https://2gis.ru/reviews/${this.branchId}/review/${reviewId}`
        : null;

    return createReview({
      name: name || null,
      iconHref: iconHref || null,
      date: review.date_created ? formDate(review.date_created) : null,
      text: review.text ?? null,
      stars: review.rating ?? 0,
      answer,
      link,
    });
  }

  private mapInfo(meta: ReviewsResponse['meta']): Info {
    return createInfo({
      name: null,
      rating: meta?.branch_rating ?? 0,
      countRating: meta?.branch_reviews_count ?? 0,
      stars: meta?.branch_rating ?? 0,
    });
  }

  async fetchAll(): Promise<{ info: Info; reviews: Review[] }> {
    const firstPage = await this.fetchPage(0);
    const meta = firstPage.meta || {};
    const totalCount = meta.total_count ?? firstPage.reviews?.length ?? 0;
    const reviews = (firstPage.reviews || []).map((review) => this.mapReview(review));

    let offset = reviews.length;
    while (offset < totalCount) {
      const page = await this.fetchPage(offset);
      const chunk = (page.reviews || []).map((review) => this.mapReview(review));
      if (chunk.length === 0) {
        break;
      }
      reviews.push(...chunk);
      offset += chunk.length;
    }

    return { info: this.mapInfo(meta), reviews };
  }

  async parseAllData(): Promise<ParseResult> {
    const { info, reviews } = await this.fetchAll();
    return { company_info: info, company_reviews: reviews };
  }

  async parseCompanyInfo(): Promise<ParseResult> {
    const { info } = await this.fetchAll();
    return { company_info: info };
  }

  async parseReviews(): Promise<ParseResult> {
    const { reviews } = await this.fetchAll();
    return { company_reviews: reviews };
  }
}
