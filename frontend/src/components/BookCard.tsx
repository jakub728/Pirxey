import { type Book } from "../types/books.js";

export default function BookCard({ title, author, ISBN, pages, rating }: Book) {
  return (
    <div className="bookcard">
      <div className="bookcard-title">
        <h1>{title}</h1>
        <h2>{author}</h2>
      </div>
      <div className="bookcard-rest">
        <p>
          <strong>ISBN:</strong> {ISBN}
        </p>
        <p>
          <strong>Pages:</strong> {pages}
        </p>
        <p>
          <strong>Rating:</strong> ⭐ {rating}
        </p>
      </div>
    </div>
  );
}
