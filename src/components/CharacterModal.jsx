const CharacterModal = ({ character, onClose }) => {
  const { name, image, gender, species, origin, episode } = character;

  // Función para obtener la clase de fondo según la especie
  const getBackgroundClass = (especie) => {
    switch (especie) {
      case "Human":
        return "bg-blue-950"; // Fondo muy oscuro para humanos
      case "Alien":
        return "bg-green-950"; // Fondo muy oscuro para alienígenas
      default:
        return "bg-gray-950"; // Fondo por defecto muy oscuro
    }
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
      <div
        className={`modal-content ${getBackgroundClass(
          species
        )} p-6 rounded-xl shadow-2xl relative max-h-[70vh] overflow-y-auto text-white`}
      >
        <button
          className="close-button absolute top-3 right-3 text-white bg-red-950 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center"
          onClick={onClose}
        >
          ✖
        </button>
        <img
          src={image}
          alt={name}
          className="w-2/3 h-auto rounded-lg mb-4 mx-auto border-4 border-gray-800 shadow-md"
        />
        <h2 className="text-2xl font-extrabold mb-3 text-center">{name}</h2>
        <p className="mb-2 text-lg">
          <span className="font-bold">Género:</span> {gender}
        </p>
        <p className="mb-4 text-lg">
          <span className="font-bold">De:</span> {origin.name}
        </p>
        <p className="font-semibold mb-2 text-lg underline">Episodios:</p>
        <ul className="list-disc list-inside space-y-1">
          {episode.map((ep, index) => (
            <li key={index} className="text-base">
              {ep}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharacterModal;
