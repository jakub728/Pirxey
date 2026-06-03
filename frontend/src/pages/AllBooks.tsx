import { baseURL } from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import { type Book } from "../types/books.js";
import BookCard from "../components/BookCard.js";
import SearchBar from "../components/SearchBar.js";
import { useState } from "react";

export default function AllBooks() {
  const [searchFilters, setSearchFilters] = useState({ title: "", author: "" });

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["books", searchFilters],
    queryFn: async () => {
      const response = await baseURL.get<Book[]>("/all", {
        params: searchFilters,
      });
      return response.data;
    },
  });

  return (
    <>
      <SearchBar onSearch={setSearchFilters} />

      <div className="main-wrapper">
        {isLoading && <p>Loading books from local database...</p>}

        {isError && <p>Could not fetch books from server.</p>}

        {isSuccess &&
          data &&
          data.map((book) => <BookCard key={book._id} {...book} />)}

        {isSuccess && data && data.length === 0 && (
          <p>No books saved in MongoDB yet.</p>
        )}
      </div>
    </>
  );
}
