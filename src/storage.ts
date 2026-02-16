export type Review = {
  name: string | null;
  icon_href: string | null;
  date: number | null;
  text: string | null;
  stars: number;
  answer: string | null;
  link: string | null;
};

export type Info = {
  name: string | null;
  rating: number;
  count_rating: number;
  stars: number;
};

export const createReview = (data: {
  name: string | null;
  iconHref: string | null;
  date: number | null;
  text: string | null;
  stars: number;
  answer: string | null;
  link: string | null;
}): Review => ({
  name: data.name,
  icon_href: data.iconHref,
  date: data.date,
  text: data.text,
  stars: data.stars,
  answer: data.answer,
  link: data.link,
});

export const createInfo = (data: {
  name: string | null;
  rating: number;
  countRating: number;
  stars: number;
}): Info => ({
  name: data.name,
  rating: data.rating,
  count_rating: data.countRating,
  stars: data.stars,
});
