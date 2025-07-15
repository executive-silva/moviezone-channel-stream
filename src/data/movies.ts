
import { Movie } from '@/types/movie';

export const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'The Dark Knight',
    poster: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=600&fit=crop',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    year: 2008,
    rating: 9.0,
    duration: '2h 32m',
    genres: ['Action', 'Crime', 'Drama'],
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    director: 'Christopher Nolan',
    streamingUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    featured: true,
    trending: true,
    category: 'Action'
  },
  {
    id: '2',
    title: 'Inception',
    poster: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=1200&h=600&fit=crop',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    year: 2010,
    rating: 8.8,
    duration: '2h 28m',
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    cast: ['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy'],
    director: 'Christopher Nolan',
    streamingUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    featured: true,
    category: 'Sci-Fi'
  },
  {
    id: '3',
    title: 'Interstellar',
    poster: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200&h=600&fit=crop',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    year: 2014,
    rating: 8.6,
    duration: '2h 49m',
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    director: 'Christopher Nolan',
    streamingUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    trending: true,
    category: 'Sci-Fi'
  },
  {
    id: '4',
    title: 'The Matrix',
    poster: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=600&fit=crop',
    description: 'A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.',
    year: 1999,
    rating: 8.7,
    duration: '2h 16m',
    genres: ['Action', 'Sci-Fi'],
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
    director: 'The Wachowskis',
    streamingUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    category: 'Action'
  },
  {
    id: '5',
    title: 'Pulp Fiction',
    poster: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop',
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
    year: 1994,
    rating: 8.9,
    duration: '2h 34m',
    genres: ['Crime', 'Drama'],
    cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
    director: 'Quentin Tarantino',
    streamingUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    category: 'Drama'
  },
  {
    id: '6',
    title: 'The Godfather',
    poster: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=600&fit=crop',
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    year: 1972,
    rating: 9.2,
    duration: '2h 55m',
    genres: ['Crime', 'Drama'],
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan'],
    director: 'Francis Ford Coppola',
    streamingUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    featured: true,
    category: 'Drama'
  }
];

export const getMoviesByCategory = (category: string) => {
  return mockMovies.filter(movie => 
    movie.category.toLowerCase() === category.toLowerCase()
  );
};

export const getFeaturedMovies = () => {
  return mockMovies.filter(movie => movie.featured);
};

export const getTrendingMovies = () => {
  return mockMovies.filter(movie => movie.trending);
};

export const searchMovies = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return mockMovies.filter(movie =>
    movie.title.toLowerCase().includes(lowercaseQuery) ||
    movie.genres.some(genre => genre.toLowerCase().includes(lowercaseQuery)) ||
    movie.cast.some(actor => actor.toLowerCase().includes(lowercaseQuery)) ||
    movie.director.toLowerCase().includes(lowercaseQuery)
  );
};

export const getMovieById = (id: string) => {
  return mockMovies.find(movie => movie.id === id);
};

export const getRelatedMovies = (movie: Movie, limit: number = 4) => {
  return mockMovies
    .filter(m => m.id !== movie.id && m.genres.some(genre => movie.genres.includes(genre)))
    .slice(0, limit);
};
