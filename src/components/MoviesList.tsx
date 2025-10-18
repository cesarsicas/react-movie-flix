import React from 'react';
import { MovieModel } from '../model/MovieModel'; 

// --- Dummy Data (Remains the same) ---
const dummyMovies: MovieModel[] = [
    new MovieModel("1", "The Matrix", "https://picsum.photos/id/237/200/300"), 
    new MovieModel("2", "Inception", "https://picsum.photos/id/169/200/300"), 
    new MovieModel("3", "Pulp Fiction", "https://picsum.photos/id/10/200/300"), 
    new MovieModel("4", "Interstellar", "https://picsum.photos/id/1018/200/300"), 
    new MovieModel("5", "Alien", "https://picsum.photos/id/354/200/300"), 
    new MovieModel("6", "Arrival", "https://picsum.photos/id/30/200/300"), 
    new MovieModel("7", "Dune", "https://picsum.photos/id/1040/200/300"), 
    new MovieModel("8", "Blade Runner 2049", "https://picsum.photos/id/312/200/300"), 
    new MovieModel("9", "Parasite", "https://picsum.photos/id/1043/200/300"), 
    new MovieModel("10", "Spirited Away", "https://picsum.photos/id/1074/200/300"), 
];

const MoviesList: React.FC<React.PropsWithChildren<{}>> = () => {
    return (
        <div className="bg-gray-100 p-4 sm:p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Popular Movies</h2>
            
            {/* 💡 THE RESPONSIVE FIX IS HERE: */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {
                    dummyMovies.map((movie) => {
                        return (
                            <div 
                                key={movie.id} 
                                className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-[1.02] transition duration-300 cursor-pointer"
                            >
                                {movie.imageUrl && (
                                    <img 
                                        src={movie.imageUrl} 
                                        alt={`Poster for ${movie.name}`} 
                                        // Made the image height responsive and dynamic based on screen size
                                        className="w-full h-64 sm:h-72 object-cover" 
                                    />
                                )}
                                
                                {/* Movie Title */}
                                <div className="p-3 text-center">
                                    <p className="text-sm sm:text-md font-semibold text-gray-900 truncate">
                                        {movie.name}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default MoviesList;