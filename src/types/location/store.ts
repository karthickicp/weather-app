export interface ILocationStore {
    location: string,
    defLocation: string,
    locationOptions: any[],
    currentWeather: any
    handleSearch: (search: string) => void,
    handleLocationOptions: (location: string) => void,
    getCurrentWeather: (locaiton: string, days: number) => void,
    selectLocation: (locaiton: string) => void
}