import {
  detailsWrapper,
  temperature,
  title,
  weatherSection,
} from "src/assets/styles/tailwind";
import moment from 'moment'

const Details = ({data}:any) => {

  return (
    <div className={detailsWrapper}>
      <h1 className={title}>The.weather</h1>
      <div className={weatherSection}>
        <h1 className={temperature}>
          {data?.current.temp_c}
          <sup>&#9900;</sup>
        </h1>
        <div className="mr-3">
          <h3 className="location">{data?.location.name}</h3>
          <p className="font-light mt-1">{data?.location.localtime}-{moment(data?.location.localtime).format('dddd')}</p>
        </div>
        <div>
          <img
            src={data?.current.condition.icon}
            alt="weather-icon"
            width={45}
          />
          <h5 className="text-center font-light">
            {data?.current.condition.text}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Details;
