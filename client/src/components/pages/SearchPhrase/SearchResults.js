import { useEffect, useState } from "react";
import { Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAds, getAllAds } from "../../../redux/adsRedux";
import AllAd from "../../features/Ad";
import Search from "./SearchPhrase";

const SearchResults = () => {
  const { searchPhrase } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const ads = useSelector(getAllAds);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ads.length === 0) {
      dispatch(fetchAds())
        .then(() => setLoading(false))
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dispatch, ads]);

  useEffect(() => {
    const filteredAds = ads.filter((ad) =>
      ad.title.toLowerCase().includes(searchPhrase.toLowerCase())
    );
    setData(filteredAds);
  }, [ads, searchPhrase]);

  return (
    <div>
      <Search />
      {loading && <Spinner />}
      {!loading && (
        <div>
          <h2 className="text-center my-3">Search results</h2>
          <Row className="justify-content-between">
            {data.map((ad) => (
              <AllAd key={ad._id} {...ad} />
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
