import { useState, useEffect } from "react";
import axios from "axios";

import { Image } from "cloudinary-react";

function OwnerCard(props) {
  const [ownerInfo, setOwnerInfo] = useState({});
  let API_URL = process.env.REACT_APP_API_URL;

  const { owner } = props;

  useEffect(
    () => {
      axios.get(API_URL + "/user/" + owner).then((response) => {
        setOwnerInfo(response.data);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className="owner-card">
      <div className="picture-owner">
        <Image
          className="img-cropper-img"
          cloudName="toolsharing"
          publicId={ownerInfo.profileImg}
        />
      </div>
      <div className="text-owner">
        <h3>Meet the owner</h3>
        <h2>{ownerInfo.username}</h2>
      </div>
    </div>
  );
}

export default OwnerCard;
