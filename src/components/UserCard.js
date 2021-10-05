import { useState, useEffect } from "react";
import axios from "axios";

function OwnerCard(props) {
  const [ownerInfo, setOwnerInfo] = useState({});
  let API_URL = process.env.REACT_APP_API_URL;

  const { ownerId } = props;

  useEffect(
    () => {
      axios.get(API_URL + "/user/" + ownerId).then((response) => {
        console.log("responseOwner: ", response);
        setOwnerInfo(response.data);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  console.log("this is the owner info:", ownerInfo);

  return (
    <div className="owner-card">
        <div className="picture-owner">
          <img src={ownerInfo.profileImg} />
        </div>
        <div className="text-owner">
        <h3>Meet the owner</h3>
        <h2>{ownerInfo.username}</h2>
        </div>
    </div>
  );
}

export default OwnerCard;
