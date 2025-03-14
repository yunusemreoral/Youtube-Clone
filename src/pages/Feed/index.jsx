import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar"
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api"
import VideoCard from "../../components/VideoCard";
import { SkeletonLoader } from "../../components/Loader";
import Error from "../../components/Error";

const Feed = () => {
  // state kurulumları
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // urldeki  parametreye eriş
  const [params] = useSearchParams();
  const selectedCat = params.get("category");

  

  // apiye istek at
  useEffect(() => {
    // apı isteği atılacak url'i belirle
    const url = !selectedCat
    ? "/home"
    : selectedCat === "trending"
    ? "/trending"
    : `/search?query=${selectedCat}`;

    setIsLoading(true);
    // apıye istek at
    api
    .get(url)
    .then((res)=> setVideos(res.data.data))
    .catch((err)=> setError(err.message))
    .finally(() => setIsLoading(false));
  }, [selectedCat]);

  return (
    <div className="flex">
        <SideBar selectedCat={selectedCat} />
        <div className="videos">
          {isLoading ? (
            <SkeletonLoader />
          ) : error ? (
            <Error />
          ) : (
            videos?.map(
              (video, key) => 
            video.type === "video" && <VideoCard key={key} video={video} />
            )
          )}
      
      </div>
    </div>
  );
};

export default Feed;
