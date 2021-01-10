import Head from "next/head";

const Layout: React.FC<{ image: string; type: string }> = (props) => {
  return (
    <>
      <Head>
        <meta property="og:image" content={props.image} />
        <meta property="og:title" content={`covid-maps: ${props.type}`} />
        <title>{`covid-maps: ${props.type}`}</title>
      </Head>
      <div className="max-w-screen-xl mx-auto">
        <header className="flex items-center justify-between py-2 border-b">
          <p className="px-2 lg:px-0">🗺️</p>
          <ul className="inline-flex items-center">
            <li className="px-2 md:px-4">
              <a
                href="/"
                className={`font-semibold hover:text-purple-500 ${
                  props.type === "deaths" ? "text-purple-600" : "text-gray-500"
                }`}
              >
                Deaths
              </a>
            </li>
            <li className="px-2 md:px-4">
              <a
                href="/cases"
                className={`font-semibold hover:text-purple-500 ${
                  props.type === "cases" ? "text-purple-600" : "text-gray-500"
                }`}
              >
                Cases
              </a>
            </li>
            <li className="px-2 md:px-4">
              <a
                href="/tests"
                className={`font-semibold hover:text-purple-500 ${
                  props.type === "tests" ? "text-purple-600" : "text-gray-500"
                }`}
              >
                Tests
              </a>
            </li>
          </ul>
        </header>

        <main className="mt-10">
          <div
            className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative"
            style={{ height: "24em" }}
          >
            <img
              src={props.image}
              className="absolute left-0 top-0 w-full h-full z-0 object-cover"
            />
            <div className="p-4 absolute bottom-0 left-0 z-20">
              <a
                href="#"
                className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2"
              >
                {props.type} per million
              </a>
            </div>
          </div>

          <div className="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
            <p className="pb-6">
              Here you can see a colored png image map of covid19 {props.type}{" "}
              per million inhabitants. Red means more {props.type}, green means
              less {props.type}
            </p>
            <p className="pb-6">
              This map has been generated with data parsed on the fly from{" "}
              <a
                className="font-bold"
                href="https://www.worldometers.info/coronavirus/"
              >
                worldometers covid table
              </a>
            </p>
            <p className="pb-6">
              You can see the code that generated this image{" "}
              <a
                className="font-bold"
                href="https://github.com/jperelli/covid-maps"
              >
                here
              </a>
            </p>
            <h2 className="text-2xl text-gray-800 font-semibold mb-4 mt-4">
              A simple explanation of how it works
            </h2>
            <ol className="list-decimal ml-5 pb-6">
              <li>GET Request to /deaths</li>
              <li>Vercel serves html file to the client</li>
              <li>Browser: GET /api/norm_deaths.png</li>
              <li>
                Vercel executes lambda function /api/norm_deaths.png.ts
                <ol className="list-decimal ml-10">
                  <li>GET https://www.worldometers.info/coronavirus/</li>
                  <li>parse html, get table of country, number</li>
                  <li>
                    generate colored geojson by merging the pares table with a
                    geojson database from world-map-geojson
                  </li>
                  <li>send geojson to osm-static-maps</li>
                  <li>return the image to the client</li>
                </ol>
              </li>
            </ol>
            <p>
              An og:image tag is set so that this also works on the fly for
              twitter and social media
            </p>
            <div className="container mx-auto px-6">
              <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
                <div className="sm:w-2/3 text-center py-6">
                  <p className="text-sm font-bold mb-2">
                    <a href="https://jperelli.com.ar">
                      Made with ❤ by jperelli
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
