import axios from "axios";
import { makeAuth } from "./auth";
import { makeUser } from "./user";

const services = {};

const instance = axios.create({
  baseURL: "/api/v1",
});

services.auth = makeAuth(instance);
services.user = makeUser(instance);

export default services;
