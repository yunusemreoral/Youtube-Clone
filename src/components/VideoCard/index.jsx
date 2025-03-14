import millify from "millify";
import { useState } from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ video, isRow }) => {
// video resmini beliryecek state
 const [isHover, setIsHover] = useState(false);

 // video tarihi için değerler

 // eğer video üzerine hover olunduysa ve movingThumbnails varsa bunu yoksa hover olunmadıysa thumbnail i render et
 const thumbnail = 
 isHover && video.richThumbnail
 ? video.richThumbnail[video.richThumbnail.length - 1].url
 : video.thumbnail[video.thumbnail.length - 1].url;

  return (
    // video kart üzerine hover olunma durumuna bağlı olarak ishover state yi güncelle
    <Link
    to={`/watch?v=${video.videoId}`}
    className={`cursor-pointer ${isRow && "row"}`}
    onMouseEnter={() => setIsHover(true)}
    onMouseLeave={() => setIsHover(false)}
    >
    
      {/* resim alanı */}
<div>
  <img 
  className="rounded-lg w-full h-full"
  src={thumbnail} 
  alt="video-image"
  />
</div>

      {/* alt detay alanı */}
     <div className={`${!isRow && "mt-4"} flex gap-4`}>
<img 
src={video.channelThumbnail[0].url}
className="size-14 rounded-full pp" 
alt="channel-pic"
/>
   <div>
<h4 className="font-bold line-clamp-2">{video.title} </h4>
<p className="channel-title">{video.channelTitle} </p>

<div className="flex gap-3 items-center mt-2">
{video.viewCount && (
  <p className="fw-bold">
    <span>{millify(video.viewCount)} </span>
    {!isRow && <span className="pe-3">Görüntüleme</span>}
  </p>
)}

{video.isLive ? (
  <p className="bg-red-500 py-0.5 px-2 rounded-lg">Canlı</p>
) : (
  <p>
    <span>{video.publishedTimeText}</span>
  </p>
)}
</div>
</div>
</div>  
    </Link>
  );
};

export default VideoCard
