import Accordion from "../components/accordion/accordion";
import styles from "./page.module.css";

export default function Faq() {
  return (
    <main className={styles.container}>
      <div className={styles["title-wrapper"]}>
        <h1 className={styles.title}>Вопросы-ответы</h1>
      </div>
      <section className={styles.accordions}>
        <Accordion
          title="Что такое Билетопоиск?"
          content={[
            "Мы — крупнейший сервис о кино в рунете. На нем вы сможете посмотреть фильмы и сериалы, купить билеты в кино, узнать рейтинги популярных видео и интересные факты, поставить фильмам оценки, написать рецензии и дополнить описание фильмов.",
          ]}
        />
        <Accordion
          title="Какой компании принадлежит Билетопоиск?"
          content={["Яндекс"]}
        />
        <Accordion
          title="Как купить билет на Билетопоиск?"
          content={["Приобрести билеты на нашем сервисе очень просто!\n 1. Перейдите на главную страницу сайта 2. Добавьте нужное количество билетов в корзину\n 3. Оплатите покупку!)"]}
        />
        <Accordion
          title="Как оставить отзыв на Билетопоиск?"
          content={["На странице фильма в разделе отзывы"]}
        />
      </section>
    </main>
  );
}
