
export interface Movie {
  id: string;
  title: string;
  poster: string;
  backdrop?: string;
  description: string;
  year: number;
  rating: number;
  duration: string;
  genres: string[];
  cast: string[];
  director: string;
  streamingUrl: string;
  featured?: boolean;
  trending?: boolean;
  category: string;
}

export interface MovieCategory {
  id: string;
  name: string;
  movies: Movie[];
}
