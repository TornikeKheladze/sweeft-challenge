import { useState } from "react";
import { Link } from "react-router-dom";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { User } from "../types/types";

const UserPage = () => {
  const { data, setData, loading, currentUser } = useInfiniteScroll();

  const [prevUsers, setPrevUsers] = useState<User[]>([]);

  const userList =
    data.length > 1 &&
    data.map(
      (user) =>
        currentUser?.id !== user.id && (
          <Link
            onClick={() => {
              setData([]);
              setPrevUsers((prevState) => {
                prevState.push(user);
                return prevState;
              });
            }}
            to={`/user/${user.id}`}
            key={user.id}
            className="w-72 border border-gray-400 cursor-pointer item"
          >
            <img src={user.imageUrl} />
            <h1 className="font-extrabold pl-2">
              {user.prefix} {user.name} {user.lastName}
            </h1>
            <h2 className="pl-2">{user.title}</h2>
          </Link>
        )
    );
  const userInfo = currentUser && (
    <div className="lg:col-span-4 col-span-2 flex w-full gap-3 items-center justify-between p-3">
      <img className="w-72" src={currentUser.imageUrl} />
      <div className="border border-gray-500 relative w-677 p-4">
        <span className="bg-white absolute -top-3 left-4 pl-3 pr-3">Info</span>
        <h1 className="font-extrabold">
          {currentUser.prefix} {currentUser.name} {currentUser.lastName}
        </h1>
        <h2 className="italic">{currentUser.title}</h2>
        <p>
          <span className="underline">Email: </span>
          {currentUser.email}
        </p>
        <p>
          <span className="underline">Ip Address: </span>
          {currentUser.ip}
        </p>
        <p>
          <span className="underline">Job Area: </span> {currentUser.jobArea}
        </p>
        <p>
          <span className="underline">Job Type: </span>
          {currentUser.jobType}
        </p>
        <p>
          <span className="underline">Job Descriptor: </span>
          {currentUser.jobDescriptor}
        </p>
      </div>
      <div className="border border-gray-500 relative w-48 p-4">
        <span className="bg-white absolute -top-3 left-3 pl-3 pr-3">
          Adress
        </span>
        <h1 className="font-extrabold pl-2">
          {currentUser.company.suffix} {currentUser.company.name}
        </h1>
        <p>
          <span className="underline">City: </span>
          {currentUser.address.city}
        </p>
        <p>
          <span className="underline">Country: </span>
          {currentUser.address.country}
        </p>
        <p>
          <span className="underline">State: </span>
          {currentUser.address.state}
        </p>
        <p>
          <span className="underline">Street Address: </span>
          {currentUser.address.streetAddress}
        </p>
        <p>
          <span className="underline">ZIP: </span>
          {currentUser.address.zipCode}
        </p>
      </div>
    </div>
  );

  const history =
    prevUsers.length > 0 &&
    prevUsers.map((user, i) => (
      <>
        {prevUsers.length > 1 && i !== 0 && ">"}
        <Link
          className="text-blue-600 underline"
          onClick={() => setData([])}
          to={`/user/${user.id}`}
        >
          {user.prefix} {user.name} {user.lastName}
        </Link>
      </>
    ));

  return (
    <div className="flex flex-col items-center w-full">
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-7 border w-1250 border-gray-400 p-3">
        {userInfo}
        <div className="lg:col-span-4 col-span-2 max-w-full">{history}</div>
        <h1 className="lg:col-span-4 col-span-2 font-extrabold text-4xl">
          Friends:
        </h1>

        {userList}
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default UserPage;
