// components/MovieCard.tsx
interface MovieCardProps {
    title: string;
    image: string;
    genres: string[];
    watchingCount: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, image, genres, watchingCount }) => {
    return (
        <div className="relative rounded-lg overflow-hidden">
            <img src={image} alt={title} className="w-full h-64 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h2 className="text-white text-2xl font-bold">{title}</h2>
                <p className="text-gray-300 text-sm">{genres.join(', ')}</p>
                <div className="mt-2 flex items-center">
                    <div className="flex -space-x-1 overflow-hidden">
                        {[...Array(3)].map((_, i) => (
                            <img
                                key={i}
                                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                src={`https://randomuser.me/api/portraits/men/${i + 1}.jpg`}
                                alt=""
                            />
                        ))}
                    </div>
                    <span className="ml-2 text-sm text-white">{watchingCount} friends are watching</span>
                </div>
                <button className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300">
                    Watch
                </button>
            </div>
        </div>
    );
};

export default MovieCard;