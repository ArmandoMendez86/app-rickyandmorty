const CharacterCard = ({ character, onClick }) => {
  const { name, status, species, image } = character;

  const getBackgroundColor = (species) => {
    switch (species) {
      case "Human":
        return "bg-blue-200";
      case "Alien":
        return "bg-gray-200";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div
      className={`character-card ${getBackgroundColor(
        species
      )} p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 w-60 h-80 flex flex-col items-center justify-center`}
      onClick={onClick}
    >
      <img
        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-sm"
        src={image}
        alt={name}
      />
      <h3 className="text-lg font-bold text-gray-800 mt-4">{name}</h3>
      <p className="text-sm text-gray-600">Status: {status}</p>
      <p className="text-sm text-gray-600">Species: {species}</p>
    </div>
  );
};

export default CharacterCard;
