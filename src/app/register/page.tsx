"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AuthContextType, SignUp } from "../../../types/user";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const { user, signup }: AuthContextType = useAuth();
  const [error, setError] = useState(null);
  const [data, setData] = useState<SignUp>({
    displayName: "",
    email: "",
    password: "",
  });

  const handleChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { authUser, error } = await signup(data);

    if (authUser) {
      router.push("/");
    }

    if (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  });

  return (
    <>
      {!user ? (
        <div className="flex min-h-full flex-col justify-center px-6 py-24 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex items-center space-x-3">
              <Image
                src="/chat-app-logo.jpeg"
                alt="My Chat Logo"
                width={120}
                height={120}
                className="mx-auto rounded-full object-center object-fill"
              />
            </div>
            <h2 className="text-2xl font-bold leading-9 text-gray-900">
              Welcome!
            </h2>
            <p className="text-gray-900 leading-3">Create a new account.</p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {error && <p className="text-red-600 text-center">{error}</p>}
            <form className="space-y-6" method="POST" onSubmit={handleSignUp}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="displayName"
                    name="displayName"
                    type="text"
                    autoComplete="displayName"
                    value={data.displayName}
                    onChange={handleChangeData}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={data.email}
                    onChange={handleChangeData}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={data.password}
                    onChange={handleChangeData}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?
              <Link
                href="/login"
                className="font-semibold leading-6 text-primary-600 hover:text-primary-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
