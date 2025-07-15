
import { Link } from 'react-router-dom';
import { Play, Star } from 'lucide-react';
import { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link to={`/movie/${movie.id}`} className="group">
      <div className="movie-card">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-white">{movie.rating}</span>
                </div>
                <span className="text-xs text-gray-300">{movie.year}</span>
              </div>
              
              <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                {movie.title}
              </h3>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {movie.genres.slice(0, 2).map((genre) => (
                  <span
                    key={genre}
                    className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/20 backdrop-blur-sm rounded-full group-hover:bg-primary/40 transition-colors">
                  <Play className="h-5 w-5 text-white fill-current" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Card Footer - Always Visible */}
        <div className="p-3 bg-card">
          <h3 className="font-semibold text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{movie.year}</span>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span>{movie.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
