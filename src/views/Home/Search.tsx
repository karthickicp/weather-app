import { useRef, useState } from "react";
import moment from "moment";

import { bottomLinedInput } from "src/assets/styles/tailwind/common";
import {
  detailSection,
  detailslTitle,
  listItem,
  searchIcon,
  searchWrapper,
  nextDay,
  locationList
} from "src/assets/styles/tailwind/home/search";
import { weatherDetails, WEATHER_DETAILS } from "src/utils/constants";
import { debounceMethod } from "src/utils/helpers";
import { useLocationStore } from "src/store";
import { ILocationStore } from "src/types";

const Search = ({ forecast, currentWeather, selectLocation }: any) => {
  const [location, setLocation] = useState("");
  // const locationOption = useLocationStore((state: ILocationStore) => state.location);
  const locationOptions = useLocationStore(
    (state: ILocationStore) => state.locationOptions
  );
  const handleSearch = useLocationStore(
    (state: ILocationStore) => state.handleSearch
  );
  const handleLocationOptions = useLocationStore(
    (state: ILocationStore) => state.handleLocationOptions
  );
  const getCurrentWeather = useLocationStore(
    (state: ILocationStore) => state.getCurrentWeather
  );

  const handleSelectLoc = (location: string) => {
    selectLocation(location);
    handleSearch(location);
    setLocation(location)
  };
  const timeoutPeriod = useRef<null | NodeJS.Timeout>(null);

  const sampleLocations = [
    "Birmingham",
    "Manchester",
    "New York",
    "California",
  ];
  return (
    <div className={searchWrapper}>
      <div className="h-16 flex items-end w-[calc(100%-4rem)]">
        <input
          type="text"
          placeholder="Another location"
          value={location}
          className={bottomLinedInput}
          onChange={(e) => setLocation(e.target.value)}
          onKeyUp={() =>
            (timeoutPeriod.current = debounceMethod(
              timeoutPeriod.current,
              () => {
                handleLocationOptions(location);
              },
              500
            ))
          }
        />
        <div className={searchIcon}>
          <img src="src/assets/icons/search.svg" className="w-5" alt="" />
        </div>
      </div>
      <div className={detailSection}>
        <ul>
          {sampleLocations.map((locStr, index) => (
            <li
              key={`${locStr} - ${index}`}
              className={`${listItem} ${locStr.toLowerCase() === location.toLowerCase() ? 'active' : ''}`}
              onClick={() => handleSelectLoc(locStr)}
            >
              {locStr}
            </li>
          ))}
        </ul>
        {locationOptions && locationOptions.length ? (
          <ul className={locationList}>
            {locationOptions.map((locationOption: any, index: number) => (
              <li
                key={`location-${index}`}
                className={`${listItem} last:mb-0`}
                onClick={() => {
                  handleSearch(locationOption.name);
                  useLocationStore.setState({ locationOptions: [] });
                  getCurrentWeather(locationOption.name, 5);
                  setLocation(locationOption.name);
                }}
              >
                {locationOption.name}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className={detailSection}>
        <h5 className={detailslTitle}>Weather Details</h5>
        <ul>
          {WEATHER_DETAILS.map((weather, index) => (
            <li key={`weather-detail-${index}`} className={listItem}>
              <h6>
                {weather.label}{" "}
                <span className="float-right font-medium">
                  {weather.value === weatherDetails.WIND
                    ? `${currentWeather[weather.value]} mph`
                    : currentWeather[weather.value]}
                </span>
              </h6>
            </li>
          ))}
        </ul>
      </div>
      <div className={detailSection}>
        <h5 className={detailslTitle}>Next Days</h5>
        <ul className="flex">
          {forecast
            ? forecast.map((data: any, index: number) => {
                if (index !== 0) {
                  return (
                    <div key={`forecast-${index}`} className={nextDay}>
                      <img
                        src={data?.day.condition.icon}
                        alt="weather-icon"
                        width={40}
                        className="m-auto"
                      />
                      <h5 className="text-center font-light text-xs">
                        {moment(data?.date).format("dddd")}
                      </h5>
                    </div>
                  );
                }
              })
            : null}
        </ul>
      </div>
    </div>
  );
};

export default Search;
