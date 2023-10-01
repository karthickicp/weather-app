import { getWeather, searchLocation } from "src/network/lib/weather";
import { ILocationStore } from "src/types";
import { create } from "zustand";

export const useLocationStore = create<ILocationStore>((set) => ({
  currentWeather: {},
  locationOptions: [],
  location: "",
  defLocation: "",
  handleLocationOptions: (location: string) => {
    if (location) {
      searchLocation(location).then((res) =>
        set(() => ({ locationOptions: res }))
      );
    } else {
      set(() => ({ locationOptions: [] }));
    }
  },
  handleSearch: (search: string) => {
    set(() => ({ location: search }));
  },
  getCurrentWeather: (location: string, days: number) => {
    set(() => ({ location: location }));
    getWeather(location, days).then((res) =>
      set(() => ({ currentWeather: res }))
    );
  },
  selectLocation: (location: string) => {
    set(() => ({ defLocation: location }));
  },
}));

export const useBookStore = create(() => ({
  amount: 40,
  title: "Alice's Adventures in Wonderland",
}));
