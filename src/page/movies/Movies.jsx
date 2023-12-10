import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Table from "react-bootstrap/Table";
import axiosInstance from "../../config";
import "../page.scss";
import MovieForm from "../../components/movieForm/MovieForm";
import Pagination from "../../components/pagination/Pagination";
import DeleteModal from "../../components/deleteModal/DeleteModal";

const Movies = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("");
  const [id, setId] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);
  const [movies, setMovies] = useState([]);
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
          `/search/movie?search=${query}&qPage=${1}`
        );
        setMovies(res.data.movies);
        setTotalPage(res.data.totalPage);

        navigate(`/movies?page=1`);
      } catch (error) {
        console.log(error);
        toast.error("Tìm kiếm thất bại!");
      }
    };

    const getMovie = async () => {
      const res = await axiosInstance.get(`/movie?qPage=${currentPage}`);
      setMovies(res.data.movies);
      setTotalPage(res.data.totalPage);
    };
    searchMode ? getSearchMode() : getMovie();
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
          <h1>Danh sách phim</h1>
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
              placeholder="Nhập tên phim"
              aria-label="Nhập tên phim"
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
            <th>Name</th>
            <th>Original Name</th>
            <th>Slug</th>
            <th>Hot</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies?.map((movie, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{movie?.name}</td>
              <td>{movie?.origin_name}</td>
              <td>{movie?.slug}</td>
              <td>
                {movie?.hot ? (
                  <i className="fa-solid fa-square-check text-success fs-3 "></i>
                ) : (
                  <i className="fa-solid fa-rectangle-xmark text-danger fs-3"></i>
                )}
              </td>
              <td>
                <div className="btn">
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(movie._id)}
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(movie._id, movie.name)}
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
        page="movies"
        totalPage={totalPage}
        currentPage={currentPage}
      />
      {displayMode && (
        <MovieForm
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
        type="phim"
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

export default Movies;
