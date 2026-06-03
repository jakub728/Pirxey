import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseURL } from "../api/axios.js";
import { type AddBook, type Book } from "../types/books.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookSchema } from "../utils/zod.js";

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

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    reset,
  } = useForm<AddBook>({
    resolver: zodResolver(BookSchema),
  });

  const onSubmit = (formData: AddBook) => {
    mutate(formData);
    reset();
  };
  const backendError = error as any;
  const generalMessage = backendError?.response?.data?.message;
  const validationErrors = backendError?.response?.data?.errors;

  return (
    <div className="addbook-wrapper">
      <h1>Add book</h1>
      <form onSubmit={handleFormSubmit(onSubmit)} className="addbook-form">
        <label>Title</label>

        <input type="text" {...register("title")} />
        {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}

        <label>Author</label>
        <input type="text" {...register("author")} />
        {errors.author && (
          <p style={{ color: "red" }}>{errors.author.message}</p>
        )}

        <label>ISBN Number</label>
        <input type="number" {...register("ISBN", { valueAsNumber: true })} />
        {errors.ISBN && <p style={{ color: "red" }}>{errors.ISBN.message}</p>}

        <label>Number of pages</label>
        <input type="number" {...register("pages", { valueAsNumber: true })} />
        {errors.pages && <p style={{ color: "red" }}>{errors.pages.message}</p>}

        <label>Rating</label>
        <input
          type="number"
          min={1}
          max={5}
          {...register("rating", { valueAsNumber: true })}
        />
        {errors.rating && (
          <p style={{ color: "red" }}>{errors.rating.message}</p>
        )}

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
