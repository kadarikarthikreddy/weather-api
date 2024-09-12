import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
function CitiesTable() {
  const [cities, setcities] = useState([]);
  const [searchcity, setsearchcity] = useState("");
  const [filtercity, setfiltercity] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [currentpage, setcurrentpage] = useState(1);
  useEffect(() => {
    getcitydata();
  }, []);
  const getcitydata = () => {
    setTimeout(async () => {
      try {
        axios
          .get(
            `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${
              (currentpage - 1) * 20
            }`
          )
          .then((res) => {
            // setcities(res.data.results);
            const newcites = res.data.results;
            setcities((prevCities) => [...prevCities, ...newcites]);
            setcurrentpage((prevpage) => prevpage + 1);
            if (newcites.length === 0) {
              sethasMore(false);
            }
          });
      } catch (error) {}
    }, 700);
  };
  // console.log(cities);

  const handlesearch = (e) => {
    setsearchcity(e.target.value);
    // console.log(e.target.value);
  };

  useEffect(() => {
    const cityname = cities.filter((city) =>
      city.name.toLowerCase().includes(searchcity.toLowerCase())
    );
    setfiltercity(cityname);
  }, [cities, searchcity]);

  return (
    <>
      <div className="mt-14">
        <h1 className=" text-center font-bold">Cities Table</h1>
        <div className=" text-center my-5">
          <input
            type="text"
            placeholder="search city name"
            className=" border border-black pl-2 py-1"
            onChange={handlesearch}
            value={searchcity}
          />
        </div>
        <div className="flex flex-col max-w-[700px] mx-auto">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <InfiniteScroll
                  dataLength={cities.length}
                  next={getcitydata}
                  hasMore={hasMore}
                  loader={
                    <h4 className=" text-center  mt-3 font-bold">Loading...</h4>
                  }
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <b>No More Data To Load</b>
                    </p>
                  }
                >
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                        >
                          City
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                        >
                          Country
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                        >
                          Time-zone
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                      {filtercity.map((city, id) => (
                        <tr
                          className="hover:bg-gray-100 dark:hover:bg-neutral-700"
                          key={id}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 cursor-pointer">
                            <Link to={`/weather/${city.name}`} target="_blank">
                              {city.name}
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                            {city.cou_name_en}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                            {city.timezone}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CitiesTable;
