import osmsm from "osm-static-maps";
import world from "world-map-geojson";
import axios from "axios";
import cheerio from "cheerio";
import mapping from "./mapping.json";
import tinygradient from "tinygradient";

type DB = Array<{ name: string; count: number }>;

const getDB = async (col_idx: number): Promise<DB> => {
  const html = await axios({
    method: "GET",
    url: "https://www.worldometers.info/coronavirus/",
  });
  const $ = cheerio.load(html.data);
  const $trs = $("#main_table_countries_today tr:not(.total_row_world)");
  const db: DB = [];
  for (let i = 0; i < $trs.length; i++) {
    const $tds = $($trs[i]).children();
    const count = Number($($tds[col_idx]).text().replace(/,/, ""));
    if (!isNaN(count)) {
      db.push({
        name: $($tds[1]).text(),
        count,
      });
    }
  }
  return db;
};

var gradient = tinygradient(["#0F0", "#ff0000", "#ff0000"]);

const getColor = (countryName: string, db: DB, reverse: boolean) => {
  const data = db.find((d) => d.name === mapping[countryName]);
  if (!data) {
    return "#bbb";
  }
  const max = Math.max(...db.map((d) => d.count));
  return gradient
    .rgbAt(reverse ? 1 - Math.min(data.count*1.4 / max, 1) : data.count / max)
    .toHexString();
};

const getImage = async (index: number, reverse: boolean = false) => {
  const db = await getDB(index);
  world.features = world.features.map((f) => ({
    ...f,
    geometry: {
      ...f.geometry,
      pathOptions: {
        color: "#000",
        weight: 1,
        opacity: 0.3,
        fillColor: getColor(f.properties.name, db, reverse),
        fillOpacity: 1,
      },
    },
  }));
  return osmsm({ geojson: world, height: 1200, width: 1200 });
};

export default getImage;
