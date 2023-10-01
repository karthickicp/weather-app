import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Cookies from "js-cookie";

import { cover } from "src/assets/styles/tailwind";
import Loader from "src/components/Loader";
import { API_INTERVEL_PERIOD, WEATHER_BACKGROUND } from "src/utils/constants";
import Details from "./Details";
import Search from "./Search";
import { useLocationStore } from "src/store";
import { ILocationStore } from "src/types";
import { AlertModal } from "src/components/Modal";

const Home = () => {
  const defaultlocation = useLocationStore((state: ILocationStore) => state.defLocation); 
  const location = useLocationStore((state: ILocationStore) => state.location); 
  // const [userLocation, setUserLocation] = useState(location || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentWeather = useLocationStore(
    (state: ILocationStore) => state.currentWeather
  );
  const getCurrentWeather = useLocationStore(
    (state: ILocationStore) => state.getCurrentWeather
  );
  const selectLocation = useLocationStore(
    (state: ILocationStore) => state.selectLocation
  );
  const storedLocation = Cookies.get("location");

  useEffect(() => {
    if (storedLocation) {
      selectLocation(storedLocation);
    } else {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      setIsModalOpen(true);
    }
  }, [storedLocation]);

  console.log(location,defaultlocation, 'userLocation');

  const successCallback = (position: any) => {
    selectLocation(`${position.coords.latitude},${position.coords.longitude}`);
    Cookies.set(
      "location",
      `${position.coords.latitude},${position.coords.longitude}`,
      { expires: 7 }
    );
    setIsModalOpen(false);
  };

  const errorCallback = (error: any) => {
    setIsModalOpen(true);
  };
  const { data } = useQuery({
    queryKey: ["location", location || defaultlocation],
    queryFn: async () => {
      if (location || defaultlocation) {
        return getCurrentWeather(location || defaultlocation, 5);
      }
    },
    refetchInterval: API_INTERVEL_PERIOD,
    enabled: Boolean(location || defaultlocation),
  });

  return (
    <>
      {!isModalOpen && !Object.keys(currentWeather).length ? (
        <Loader />
      ) : isModalOpen ? (
        <AlertModal
          isOpen={isModalOpen}
          handleModalClose={() => setIsModalOpen(false)}
        />
      ) : (
        <div className="flex flex-col sm:flex-row">
          <img
            className={`${cover} bg-cover`}
            src={
              WEATHER_BACKGROUND.find(
                (bg) =>
                  bg.condition === currentWeather.current.condition.text &&
                  bg.is_day === currentWeather.current.is_day
              )?.image
            }
            alt="background"
          />
          <div className="w-full h-50 sm:w-2/3">
            <Details data={currentWeather} />
          </div>
          <div className="w-full sm:w-1/3">
            <Search
              forecast={currentWeather.forecast.forecastday}
              currentWeather={currentWeather.current}
              selectLocation={selectLocation}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
