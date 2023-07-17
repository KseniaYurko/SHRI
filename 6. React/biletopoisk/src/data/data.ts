export const genres: Genres = {
  fantasy: "Фэнтези",
  horror: "Ужасы",
  action: "Экшн",
  comedy: "Комедия",
};

export const genresList = [
  { id: "1", name: "Не выбран" },
  { id: "2", name: "Экшн" },
  { id: "3", name: "Комедия" },
  { id: "4", name: "Фэнтези" },
  { id: "5", name: "Ужасы" },
];

export const cinemasList = [
  { id: "0", name: "Не выбран" },
  { id: "CTfrB5PGEJHBwxCNlU4uo", name: "Синема сад" },
  { id: "2a2976KdjBek0e2ZR_07V", name: "4 с половиной звезды" },
  { id: "4gJr8UOYvT7UuprciZ4iL", name: "Дружба" },
];

interface Genres {
  [key: string]: string;
}
