import Review from "../review/review";
import styles from "./reviews.module.css";
import { useGetMovieReviewsQuery } from "@/redux/services/movieApi";

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
}

export default function Reviews({ id }: { id: string }) {
  const { data, isLoading, isSuccess, isError, error } =
    useGetMovieReviewsQuery(id);

  let content;
  if (isLoading) {
    content = <span>Loading...</span>;
  } else if (isSuccess) {
    content = data.map((review: Review) => (
      <Review key={review.id} {...review} />
    ));
  } else if (isError) {
    content = <span>{error.toString()}</span>;
  }

  return <section className={styles.container}>{content}</section>;
}
