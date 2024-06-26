import React, { useState } from "react";

import { Button, InputGroup, Form } from "react-bootstrap";

const Search = () => {
  const [searchPhrase, setSearchPhrase] = useState("");

  const handleSearch = () => {
    window.location.href = `/ad/search/${searchPhrase}`;
  };
  return (
    <div className="d-flex justify-content-center mt-3 mb-5 ">
      <div>
        <InputGroup className="">
          <Form.Control
            className="shadow-none"
            type="text"
            placeholder="search phrase..."
            value={searchPhrase}
            onChange={(e) => setSearchPhrase(e.target.value)}
          />
          <Button variant="success" onClick={handleSearch}>
            Search
          </Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default Search;
