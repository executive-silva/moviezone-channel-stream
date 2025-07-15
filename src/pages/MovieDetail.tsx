
import { useParams, Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, Star, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MovieCard } from '@/components/MovieCard';
import { getMovieById, getRelatedMovies } from '@/data/movies';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const movie = id ? getMovieById(id) : null;
  const relatedMovies = movie ? getRelatedMovies(movie) : [];

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Movie Not Found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <Link to="/">
          <Button variant="ghost" size="sm" className="bg-black/50 text-white hover:bg-black/70">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
      </div>

      {/* Video Player Section */}
      <div className="relative w-full h-[60vh] bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={movie.backdrop || movie.poster}
          src={movie.streamingUrl}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        
        {/* Video Controls Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <Button
              onClick={togglePlay}
              size="lg"
              className="bg-primary/80 hover:bg-primary text-white rounded-full w-16 h-16"
            >
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 fill-current" />}
            </Button>
          </div>
          
          {/* Bottom Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                onClick={toggleMute}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            </div>
            
            <Button
              onClick={toggleFullscreen}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-4 gradient-text">{movie.title}</h1>
              
              <div className="flex flex-wrap items-center gap-6 mb-6 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{movie.rating}</span>
                  <span className="text-muted-foreground">/10</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span>{movie.duration}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span>{movie.year}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{movie.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Director</h3>
                <p className="text-muted-foreground">{movie.director}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Cast</h3>
                <p className="text-muted-foreground">{movie.cast.join(', ')}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full rounded-lg mb-4"
              />
              
              <Button 
                onClick={togglePlay}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
                size="lg"
              >
                <Play className="h-5 w-5 mr-2 fill-current" />
                {isPlaying ? 'Playing...' : 'Watch Now'}
              </Button>
            </div>
          </div>
        </div>

        {/* Related Movies */}
        {relatedMovies.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">More Like This</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedMovies.map((relatedMovie) => (
                <MovieCard key={relatedMovie.id} movie={relatedMovie} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
