// import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// import { scaleLinear } from "d3-scale";
// import worldMapData from "./worldMapData.json"; // GeoJSON file for world map

// type CountryData = {
//   country: string;
//   total: number;
// };

// interface WorldMapProps {
//   data: CountryData[];
// }

// const colorScale = scaleLinear<number, string>()
//   .domain([0, 100])
//   .range(["#f0f9e8", "#006d2c"]);

// const WorldMap: React.FC<WorldMapProps> = ({ data }) => {
//   return (
//     <div className="w-full h-full">
//       <ComposableMap>
//         <Geographies geography={worldMapData}>
//           {({ geographies }) =>
//             geographies.map((geo) => {
//               const countryData = data.find((d) => d.country === geo.id);
//               const intensity = countryData?.total || 0;
//               return (
//                 <Geography
//                   key={geo.rsmKey}
//                   geography={geo}
//                   fill={colorScale(intensity)}
//                   stroke="#EAEAEC"
//                   style={{
//                     default: { outline: "none" },
//                     hover: { outline: "none" },
//                     pressed: { outline: "none" },
//                   }}
//                 />
//               );
//             })
//           }
//         </Geographies>
//       </ComposableMap>
//     </div>
//   );
// };

// export default WorldMap;
