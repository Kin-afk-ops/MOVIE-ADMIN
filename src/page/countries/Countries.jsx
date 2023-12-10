import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import CountriesForm from "../../components/countriesForm/CountriesForm";

import Table from "react-bootstrap/Table";
import axiosInstance from "../../config";
import "../page.scss";
import Pagination from "../../components/pagination/Pagination";
import DeleteModal from "../../components/deleteModal/DeleteModal";

const Countries = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("");
  const [id, setId] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);
  const [countries, setCountries] = useState([]);
  const [name, setName] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [displayMode, setDisplayMode] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page");

  useEffect(() => {
    const getSearchMode = async () => {
      try {
        const res = await axiosInstance.get(
          `/search/country?search=${query}&qPage=${1}`
        );

        setCountries(res.data.countries);
        setTotalPage(res.data.totalPage);
        navigate(`/countries?page=1`);
      } catch (error) {
        console.log(error);
      }
    };

    const getCountries = async () => {
      const res = await axiosInstance.get(`/country?qPage=${currentPage}`);
      setCountries(res.data.countries);
      setTotalPage(res.data.totalPage);
    };
    searchMode ? getSearchMode() : getCountries();
  }, [currentPage, searchMode]);

  const handleChange = (e) => {
    setSearchMode(false);
    setQuery(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      setSearchMode(true);
    }
  };

  const handleAdd = () => {
    setDisplayMode(true);
    setMode("add");
  };

  const handleEdit = (id) => {
    setDisplayMode(true);
    setMode("edit");
    setId(id);
  };

  const handleDelete = (id, name) => {
    setId(id);
    setName(name);
    setDeleteMode(true);
  };

  return (
    <div className="grid element">
      <div className="header flex__center row">
        <div className="c-5">
          <h1>Danh sách quốc gia</h1>
        </div>
        <div className="c-1">
          <Button variant="primary" onClick={handleAdd}>
            <i class="fa-solid fa-plus"></i>
            Add
          </Button>
        </div>

        <div className="c-6">
          <InputGroup>
            <Form.Control
              placeholder="Nhập tên quốc gia"
              aria-label="Nhập tên quốc gia"
              aria-describedby="basic-addon2"
              onChange={(e) => handleChange(e)}
              onKeyDown={handleKeyDown}
            />
            <Button variant="primary" onClick={() => setSearchMode(true)}>
              <i class="fa-solid fa-magnifying-glass"></i>
            </Button>
          </InputGroup>
        </div>
      </div>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên danh mục</th>
            <th>Slug</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {countries?.map((country, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{country?.name}</td>
              <td>{country?.slug}</td>

              <td>
                <div className="btn">
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(country._id)}
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(country._id, country.name)}
                  >
                    <i class="fa-solid fa-trash"></i>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        page="countries"
        totalPage={totalPage}
        currentPage={currentPage}
      />
      {displayMode && (
        <CountriesForm
          mode={mode}
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
          id={id}
        />
      )}
      <DeleteModal
        id={id}
        name={name}
        deleteMode={deleteMode}
        setDeleteMode={setDeleteMode}
        type="quốc gia"
      />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Countries;
