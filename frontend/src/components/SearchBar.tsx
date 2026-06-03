import { type SearchBarProps } from "../types/books";

export default function SearchBar({ onSearch }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = (formData.get("title") as string).trim();
    const author = (formData.get("author") as string).trim();

    onSearch({ title, author });
  };

  return (
    <form onSubmit={handleSubmit} className="searchform">
      <div>
        <label>Title </label>
        <input type="text" name="title" placeholder="Search by title..." />
      </div>
      <div>
        <label>Author </label>
        <input type="text" name="author" placeholder="Search by author..." />
      </div>
      <div>
        <button type="submit">Search</button>
        <button
          type="button"
          onClick={(e) => {
            const form = e.currentTarget.form;
            if (form) {
              form.reset();
              onSearch({ title: "", author: "" });
            }
          }}
        >
          Clear
        </button>
      </div>
    </form>
  );
}
