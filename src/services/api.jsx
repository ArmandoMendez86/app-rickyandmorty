import axios from "axios";

export const fetchCharacters = async (page) => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
