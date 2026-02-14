export type Review = {
    name: string | null;
    icon_href: string | null;
    date: number | null;
    text: string | null;
    stars: number;
    answer: string | null;
};
export type Info = {
    name: string | null;
    rating: number;
    count_rating: number;
    stars: number;
};
export declare const createReview: (data: {
    name: string | null;
    iconHref: string | null;
    date: number | null;
    text: string | null;
    stars: number;
    answer: string | null;
}) => Review;
export declare const createInfo: (data: {
    name: string | null;
    rating: number;
    countRating: number;
    stars: number;
}) => Info;
