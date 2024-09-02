import { useState, useEffect } from "react";
import axios from "axios";
import { Coordenadas } from "../interfaces";

const useCoordenadas = () => {
  const [coordenadas, setCoordenadas] = useState<Coordenadas[] | null>(null);
  const [bairros, setBairros] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCoordenadas = async () => {
      try {
        const response = await axios.get<any>(
          "https://igor-e1982-default-rtdb.firebaseio.com/coordenadas.json"
        );

        const lista = Object.keys(response.data);
        const coordenadas: Coordenadas[] = [];
        const bairros = new Set();

        for (let l of lista) {
          coordenadas.push(response.data[l]);
          coordenadas.sort((a: Coordenadas, b: Coordenadas) =>
            a.logradouro.localeCompare(b.logradouro)
          );
          bairros.add(response.data[l].bairro);
        }

        setBairros(Array.from(bairros));
        setCoordenadas(coordenadas);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordenadas();
  }, []);

  return { coordenadas, bairros, loading, error };
};

export default useCoordenadas;
