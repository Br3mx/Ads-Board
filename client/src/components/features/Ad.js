import { useSelector } from "react-redux";
import { getAllAds } from "../../redux/adsRedux";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IMG_URL } from "../../config";
import style from "./Ad.module.scss";

const AllAd = () => {
  const ads = useSelector(getAllAds);

  return (
    <>
      <Row className="mb-4 col-12 mx-auto">
        <Col>
          <h1 className="text-center">All Ads</h1>
        </Col>
      </Row>
      <Row>
        {ads.map((ad) => (
          <Col
            key={ad._id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            className="mb-4"
          >
            <Card style={{ width: "100%", margin: "0", padding: "0" }}>
              <Card.Img
                variant="top"
                className={style.cardImage}
                src={IMG_URL + ad.image}
              />
              <Card.Body>
                <Card.Title>{ad.title}</Card.Title>
                <Card.Text className="mb-3 text-muted">{ad.location}</Card.Text>

                <Link to={`/ad/${ad._id}`}>
                  <Button variant="primary">Read more...</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default AllAd;
