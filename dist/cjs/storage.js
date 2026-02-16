"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInfo = exports.createReview = void 0;
const createReview = (data) => ({
    name: data.name,
    icon_href: data.iconHref,
    date: data.date,
    text: data.text,
    stars: data.stars,
    answer: data.answer,
    link: data.link,
});
exports.createReview = createReview;
const createInfo = (data) => ({
    name: data.name,
    rating: data.rating,
    count_rating: data.countRating,
    stars: data.stars,
});
exports.createInfo = createInfo;
