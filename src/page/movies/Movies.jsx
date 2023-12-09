import { useState, useEffect } from "react";

import Table from "react-bootstrap/Table";
import axiosInstance from "../../config";
import { useSearchParams } from "react-router-dom";
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  let [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page");

  useEffect(() => {
    const getMovie = async () => {
      const res = await axiosInstance.get(`/movie?qPage=${1}`);
      setMovies(res.data.movies);
      setTotalPage(res.data.totalPage);
    };

    getMovie();
  }, []);

  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>Name</th>
          <th>Original Name</th>
          <th>Slug</th>
          <th>Categories</th>
          <th>Countries</th>
          <th>Hot</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie, index) => (
          <tr>
            <td>{movie?.name}</td>
            <td>{movie?.origin_name}</td>
            <td>{movie?.slug}</td>
            <td>...</td>
            <td>...</td>
            <td>{movie?.hot}</td>
            <td>...</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Movies;
