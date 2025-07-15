
import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { MovieCard } from '@/components/MovieCard';
import { Button } from '@/components/ui/button';
import { Play, Star, Clock, Film } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockMovies, getFeaturedMovies, getTrendingMovies, searchMovies, getMoviesByCategory } from '@/data/movies';
import { Movie } from '@/types/movie';

const Index = () => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [currentHero, setCurrentHero] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  
  const featuredMovies = getFeaturedMovies();
  const trendingMovies = getTrendingMovies();
  const actionMovies = getMoviesByCategory('Action');
  const sciFiMovies = getMoviesByCategory('Sci-Fi');
  const dramaMovies = getMoviesByCategory('Drama');

  // Auto-rotate hero section
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % featuredMovies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      const results = searchMovies(query);
      setSearchResults(results);
      setIsSearching(true);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const currentFeatured = featuredMovies[currentHero];

  return (
    <div className="min-h-screen bg-background">
      <Navigation onSearch={handleSearch} />
      
      {!isSearching ? (
        <>
          {/* Hero Section */}
          {currentFeatured && (
            <section className="relative h-[70vh] overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                style={{ 
                  backgroundImage: `url(${currentFeatured.backdrop || currentFeatured.poster})` 
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              </div>
              
              <div className="relative container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl space-y-6 animate-fadeInUp">
                  <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                    {currentFeatured.title}
                  </h1>
                  
                  <div className="flex items-center space-x-6 text-white/80">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="font-medium">{currentFeatured.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-5 w-5" />
                      <span>{currentFeatured.duration}</span>
                    </div>
                    <span>{currentFeatured.year}</span>
                  </div>
                  
                  <p className="text-lg text-white/90 leading-relaxed max-w-xl">
                    {currentFeatured.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentFeatured.genres.map((genre) => (
                      <span
                        key={genre}
                        className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Link to={`/movie/${currentFeatured.id}`}>
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 animate-pulse-glow">
                        <Play className="h-5 w-5 mr-2 fill-current" />
                        Watch Now
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-white/30 text-white hover:bg-white/10 font-semibold px-8"
                    >
                      More Info
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Hero Navigation Dots */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {featuredMovies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentHero(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentHero ? 'bg-primary w-8' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Movie Sections */}
          <div className="container mx-auto px-4 py-12 space-y-16">
            {/* Trending Now */}
            <section className="animate-fadeInUp">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold gradient-text">Trending Now</h2>
                <Button variant="ghost" className="text-primary hover:text-primary/80">
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {trendingMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </section>

            {/* Action Movies */}
            <section className="animate-slideInRight">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-foreground">Action Movies</h2>
                <Button variant="ghost" className="text-primary hover:text-primary/80">
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {actionMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </section>

            {/* Sci-Fi Movies */}
            <section className="animate-fadeInUp">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-foreground">Sci-Fi Adventures</h2>
                <Button variant="ghost" className="text-primary hover:text-primary/80">
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {sciFiMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </section>

            {/* Drama Movies */}
            <section className="animate-slideInRight">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-foreground">Award-Winning Dramas</h2>
                <Button variant="ghost" className="text-primary hover:text-primary/80">
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {dramaMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </section>
          </div>
        </>
      ) : (
        // Search Results
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Search Results</h2>
            <p className="text-muted-foreground">
              Found {searchResults.length} movie{searchResults.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {searchResults.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No movies found. Try a different search term.</p>
            </div>
          )}
        </div>
      )}
      
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Film className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold gradient-text">MovieZone</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your ultimate destination for streaming movies online.
            </p>
            <div className="mt-4">
              <Link 
                to="/admin/login"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Silva Tech Inc
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
