import { baseURL } from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import { type Book } from "../types/books.js";
import BookCard from "../components/BookCard.js";

export default function AllBooks() {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await baseURL.get<Book[]>("/all");
      return response.data;
    },
  });

  return (
    <>
      {isLoading && <p>Loading books from local database...</p>}

      {isError && <p>Could not fetch books from server.</p>}

      {isSuccess &&
        data &&
        data.map((book) => <BookCard key={book._id} {...book} />)}

      {isSuccess && data && data.length === 0 && (
        <p>No books saved in MongoDB yet.</p>
      )}
    </>
  );
}
