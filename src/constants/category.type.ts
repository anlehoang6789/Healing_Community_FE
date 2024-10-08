export const Category = {
  Travel: "Du lịch",
  Food: "Nấu ăn",
  Film: "Phim ảnh",
  Health: "Sức khỏe",
  Other: "Khác",
} as const;

export const CategoryValues = [
  Category.Travel,
  Category.Food,
  Category.Film,
  Category.Health,
  Category.Other,
] as const;
