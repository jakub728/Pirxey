import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseURL } from "../api/axios.js";
import { type AddBook, type Book } from "../types/books.js";

export default function AddBook() {
  const queryClient = useQueryClient();

  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationFn: async (newBook: AddBook) => {
      const response = await baseURL.post<Book>("/add", newBook);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const bookData: AddBook = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      ISBN: Number(formData.get("ISBN")),
      pages: Number(formData.get("pages")),
      rating: Number(formData.get("rating")),
    };

    mutate(bookData);
    e.currentTarget.reset();
  };

  const backendError = error as any;
  const validationErrors = backendError?.response?.data?.errors;
  const generalMessage = backendError?.response?.data?.message;

  return (
    <div className="addbook-wrapper">
      <h1>Add book</h1>
      <form onSubmit={handleSubmit} className="addbook-form">
        <label>Title</label>
        <input type="text" name="title" required />

        <label>Author</label>
        <input type="text" name="author" required />

        <label>ISBN Number</label>
        <input type="number" name="ISBN" required />

        <label>Number of pages</label>
        <input type="number" name="pages" required />

        <label>Rating</label>
        <input type="number" name="rating" min={1} max={5} required />

        <button type="submit" disabled={isPending}>
          {isPending ? "Adding.." : "Add"}
        </button>
      </form>

      {error && (
        <div className="error-msg">
          <strong>{generalMessage || "Something went wrong"}</strong>
          <ul style={{ paddingLeft: "20px", margin: "5px 0 0" }}>
            {validationErrors?.map((err, index) => (
              <li key={index}>
                {err.field}: {err.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {isSuccess && data && (
        <p className="success-msg">
          Book added: <strong>{data.title}</strong>
        </p>
      )}
    </div>
  );
}
