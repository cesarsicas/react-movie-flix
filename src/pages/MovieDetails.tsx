import React from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";

export function MovieDetails() {
  let { id } = useParams();
  return <p>Details {id}</p>;
}
