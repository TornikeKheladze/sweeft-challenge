import axios from "axios";

const instance = axios.create({
  baseURL: "http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const getUsersByPage = async (page: number) => {
  const response = await instance.get(`/user/${page}/20`);
  return response;
};

export const getFriends = async (userId: number, page: number) => {
  const response = await instance.get(`/user/${userId}/friends/${page}/20`);
  return response;
};

export const getSingleUser = async (userId: number) => {
  const response = await instance.get(`/user/${userId}`);
  return response;
};
