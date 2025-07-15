
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Film, LogOut, Upload, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { mockMovies } from '@/data/movies';
import { Movie } from '@/types/movie';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [movies, setMovies] = useState<Movie[]>(mockMovies);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    poster: '',
    backdrop: '',
    description: '',
    year: new Date().getFullYear(),
    rating: 0,
    duration: '',
    genres: [] as string[],
    cast: [] as string[],
    director: '',
    streamingUrl: '',
    category: ''
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('moviezone-admin');
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('moviezone-admin');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    navigate('/');
  };

  const resetForm = () => {
    setFormData({
      title: '',
      poster: '',
      backdrop: '',
      description: '',
      year: new Date().getFullYear(),
      rating: 0,
      duration: '',
      genres: [],
      cast: [],
      director: '',
      streamingUrl: '',
      category: ''
    });
    setEditingMovie(null);
  };

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
    setFormData({
      title: movie.title,
      poster: movie.poster,
      backdrop: movie.backdrop || '',
      description: movie.description,
      year: movie.year,
      rating: movie.rating,
      duration: movie.duration,
      genres: movie.genres,
      cast: movie.cast,
      director: movie.director,
      streamingUrl: movie.streamingUrl,
      category: movie.category
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const movieData: Movie = {
      id: editingMovie?.id || Date.now().toString(),
      ...formData,
      featured: editingMovie?.featured || false,
      trending: editingMovie?.trending || false
    };

    if (editingMovie) {
      setMovies(prev => prev.map(m => m.id === editingMovie.id ? movieData : m));
      toast({
        title: "Movie Updated",
        description: `${movieData.title} has been updated successfully`,
      });
    } else {
      setMovies(prev => [...prev, movieData]);
      toast({
        title: "Movie Added",
        description: `${movieData.title} has been added successfully`,
      });
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    const movie = movies.find(m => m.id === id);
    setMovies(prev => prev.filter(m => m.id !== id));
    toast({
      title: "Movie Deleted",
      description: `${movie?.title} has been deleted successfully`,
      variant: "destructive",
    });
  };

  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Adventure', 'Crime'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Film className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold gradient-text">MovieZone Admin</h1>
              <p className="text-sm text-muted-foreground">Manage your movie collection</p>
            </div>
          </div>
          
          <Button onClick={handleLogout} variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-white">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Movies</p>
                  <p className="text-3xl font-bold text-primary">{movies.length}</p>
                </div>
                <Film className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Featured Movies</p>
                  <p className="text-3xl font-bold text-accent">{movies.filter(m => m.featured).length}</p>
                </div>
                <Upload className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <p className="text-3xl font-bold text-green-500">{new Set(movies.map(m => m.category)).size}</p>
                </div>
                <Plus className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Movie Management</h2>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Movie
              </Button>
            </DialogTrigger>
            
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingMovie ? 'Edit Movie' : 'Add New Movie'}</DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="poster">Poster URL</Label>
                    <Input
                      id="poster"
                      value={formData.poster}
                      onChange={(e) => setFormData(prev => ({ ...prev, poster: e.target.value }))}
                      placeholder="https://..."
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backdrop">Backdrop URL (Optional)</Label>
                    <Input
                      id="backdrop"
                      value={formData.backdrop}
                      onChange={(e) => setFormData(prev => ({ ...prev, backdrop: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating (1-10)</Label>
                    <Input
                      id="rating"
                      type="number"
                      min="1"
                      max="10"
                      step="0.1"
                      value={formData.rating}
                      onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="2h 30m"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {genres.map((genre) => (
                          <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="director">Director</Label>
                  <Input
                    id="director"
                    value={formData.director}
                    onChange={(e) => setFormData(prev => ({ ...prev, director: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cast">Cast (comma-separated)</Label>
                  <Input
                    id="cast"
                    value={formData.cast.join(', ')}
                    onChange={(e) => setFormData(prev => ({ ...prev, cast: e.target.value.split(', ') }))}
                    placeholder="Actor 1, Actor 2, Actor 3"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="genres">Genres (comma-separated)</Label>
                  <Input
                    id="genres"
                    value={formData.genres.join(', ')}
                    onChange={(e) => setFormData(prev => ({ ...prev, genres: e.target.value.split(', ') }))}
                    placeholder="Action, Drama, Thriller"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="streamingUrl">Streaming URL</Label>
                  <Input
                    id="streamingUrl"
                    value={formData.streamingUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, streamingUrl: e.target.value }))}
                    placeholder="https://..."
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  <Save className="h-4 w-4 mr-2" />
                  {editingMovie ? 'Update Movie' : 'Add Movie'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Movies Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Movies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-16 h-24 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{movie.title}</h3>
                      <p className="text-sm text-muted-foreground">{movie.year} • {movie.category}</p>
                      <p className="text-sm text-muted-foreground">⭐ {movie.rating} • {movie.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => handleEdit(movie)}
                      variant="outline"
                      size="sm"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(movie.id)}
                      variant="outline"
                      size="sm"
                      className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
