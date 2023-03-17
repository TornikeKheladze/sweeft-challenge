import { Link } from "react-router-dom";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

const Home = () => {
  const { data, loading } = useInfiniteScroll();

  const userList =
    data.length > 1 &&
    data.map((user) => (
      <Link
        to={`user/${user.id}`}
        key={user.id}
        className="w-72 border border-gray-400 cursor-pointer item"
      >
        <img src={user.imageUrl} />
        <h1 className="font-extrabold pl-2">
          {user.prefix} {user.name} {user.lastName}
        </h1>
        <h2 className="pl-2">{user.title}</h2>
      </Link>
    ));

  return (
    <div className="flex justify-center w-full pt-5">
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-7 lg:w-1200">
        {userList}
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default Home;
