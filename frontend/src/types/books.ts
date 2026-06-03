export interface Book {
  _id: string;
  title: string;
  author: string;
  ISBN: number;
  pages: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddBook {
  title: string;
  author: string;
  ISBN: number;
  pages: number;
  rating: number;
}

export interface SearchBarProps {
  onSearch: (filters: { title: string; author: string }) => void;
}

