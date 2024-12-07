import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import api from "../services/api";
import { useRouter } from "next/navigation";
import "leaflet/dist/leaflet.css";

// Carregar componentes do mapa dinamicamente (evita SSR)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const states = [
  "AC",
  "AL",
  "AM",
  "BA",
  "CE",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

export default function Sonar() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true); // Marca o estado como cliente
    }
  }, []);

  const fetchAuctions = async (page, state) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("Você precisa estar logado!");
        router.push("/login");
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await api.get(`/map?state=${state}`, {
        params: { page },
        ...config,
      });
      setAuctions(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedState) {
      fetchAuctions(1, selectedState);
    }
  }, [selectedState]);

  if (!isClient) {
    return <div>Loading...</div>; // Exibe um loading até o componente ser renderizado no cliente
  }

  return (
    <h1>sonar</h1>
    // <div style={{ height: "100vh" }}>
    //   <div>
    //     <select
    //       value={selectedState}
    //       onChange={(e) => setSelectedState(e.target.value)}
    //     >
    //       <option value="">Selecione um estado</option>
    //       {states.map((state) => (
    //         <option key={state} value={state}>
    //           {state}
    //         </option>
    //       ))}
    //     </select>
    //   </div>

    //   <MapContainer
    //     center={[-14.235, -51.9253]}
    //     zoom={4}
    //     style={{ height: "80vh" }}
    //   >
    //     <TileLayer
    //       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //       attribution="© OpenStreetMap contributors"
    //     />
    //     {auctions.map((auction) => {
    //       const coords = auction.geolocation.split(",");
    //       const lat = parseFloat(coords[0]);
    //       const lng = parseFloat(coords[1]);

    //       return (
    //         <Marker key={auction.id} position={[lat, lng]}>
    //           <Popup>{auction.name}</Popup>
    //         </Marker>
    //       );
    //     })}
    //   </MapContainer>
    // </div>
  );
}
