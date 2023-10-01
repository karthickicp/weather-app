import { loader, loadingAnimation } from "src/assets/styles/tailwind";

const Loader = () => {
  return (
    <div className={loader}>
 <div className="flex items-center justify-center space-x-2">
      <div className={loadingAnimation}></div>
      <div className={loadingAnimation}></div>
      <div className={loadingAnimation}></div>
    </div>
    </div>
   
  );
};

export default Loader;
