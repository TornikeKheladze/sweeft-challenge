import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getFriends, getSingleUser, getUsersByPage } from "../services/axios";
import { SingleUser, User } from "../types/types";

export const useInfiniteScroll = () => {
  const [data, setData] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [currentUser, setCurrentUser] = useState<SingleUser>();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>();
  const { userId } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getSingleUser(Number(userId));
        setCurrentUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (userId) {
      getUser();
    }
  }, [userId]);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );
  }, [hasMore]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!userId) {
          const { data } = await getUsersByPage(page);
          setData((prevData) => [...prevData, ...data.list]);
          setHasMore(data.list.length > 0);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getFriends(Number(userId), page);
      setData((prevData) => [...prevData, ...data.list]);
      setHasMore(data.list.length > 0);
    };
    if (userId) {
      fetchData();
    }
  }, [page, userId]);

  useEffect(() => {
    if (observer.current) {
      const lastItem = document.querySelector(".item:last-child");

      if (lastItem) {
        observer.current.observe(lastItem);
      }
    }
  }, [data]);

  return { data, setData, loading, currentUser };
};
