export const createReview = (data) => ({
    name: data.name,
    icon_href: data.iconHref,
    date: data.date,
    text: data.text,
    stars: data.stars,
    answer: data.answer,
    review_link: data.reviewLink,
});
export const createInfo = (data) => ({
    name: data.name,
    rating: data.rating,
    count_rating: data.countRating,
    stars: data.stars,
});
