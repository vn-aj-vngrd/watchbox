/* eslint-disable @next/next/no-img-element */
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { trpc } from "../utils/trpc";

type Inputs = {
  username: string;
};

const Profile = () => {
  const {
    register,
    handleSubmit,
    // watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const { data: session } = useSession();
  const [image, setImage] = useState<ImageListType>([]);

  useEffect(() => {
    reset();
  }, [reset]);

  const { mutate, isLoading, error } = trpc.useMutation(["auth.updateUser"], {
    onSuccess: () => {
      console.log("success");
    },
  });

  const onChange = (imageList: ImageListType) => {
    setImage(imageList);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    // console.log(image[0]?.file);

    // mutate({ data.username, image });
  };

  return (
    <div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md py-12 space-y-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-4 text-3xl font-semibold text-center text-gray-900 dark:text-white">
            Account Profile
          </h2>
        </div>

        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10 dark:bg-darkerColor">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div className="mx-auto relative w-32 h-32 bg-gray-100 rounded-full dark:bg-gray-600">
                <Image
                  className="absolute z-0 w-24 h-24 rounded-full"
                  loader={() => `${session?.user?.image}?w=500&q=100` || ""}
                  src={session?.user?.image || ""}
                  alt=""
                  layout="fill"
                />

                <label
                  htmlFor="preview"
                  className="cursor absolute bottom-0 right-0 w-8 h-8 z-20 p-1.5 rounded-full bg-white border text-gray-700 shadow-sm dark:bg-grayColor dark:border-grayColor dark:text-white cursor-pointer "
                >
                  <PencilSquareIcon />
                </label>
                <input id="preview" type="file" className="hidden" />

                <ImageUploading
                  multiple
                  value={image}
                  onChange={(imageList: ImageListType) => onChange(imageList)}
                  dataURLKey="data_url"
                >
                  {({ imageList, onImageUpload }) => (
                    <div className="upload__image-wrapper">
                      <button
                        onClick={onImageUpload}
                        className="cursor absolute bottom-0 right-0 w-8 h-8 z-20 p-1.5 rounded-full bg-white border text-gray-700 shadow-sm dark:bg-grayColor dark:border-grayColor dark:text-white cursor-pointer"
                      >
                        <PencilSquareIcon className="" />
                      </button>

                      {imageList?.map((image, index) => (
                        <div key={index} className="image-item">
                          <Image
                            src={image["data_url"]}
                            className="absolute z-0 w-24 h-24 rounded-full"
                            alt=""
                            layout="fill"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </ImageUploading>
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Username
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    className={
                      errors.username
                        ? "block w-full px-3 py-2 placeholder-red-400 border border-red-400 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-red-500 focus:border-blue-500 sm:text-sm"
                        : "block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:border-darkerColor dark:focus:border-blue-500 dark:focus:ring-blue-400"
                    }
                    {...register("username", {
                      value: session?.user?.username || " ",
                      required: {
                        value: true,
                        message: "* Please enter a username to update.",
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9]{5,}$/,
                        message:
                          "* Username must be at least 5 characters long and contain only letters and numbers.",
                      },
                    })}
                  />
                </div>
                <div className="mt-3 text-sm text-red-500">
                  {errors.username && errors.username.message}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Email
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="email"
                    autoComplete="email"
                    disabled
                    value={session?.user?.email || ""}
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:border-darkerColor dark:focus:border-blue-500 dark:focus:ring-blue-400"
                  />
                </div>
                <div className="mt-3 text-sm text-red-500">
                  {/* {errors.email && errors.email.message} */}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
              >
                Save Changes
              </button>
            </div>
          </form>

          <div className="mt-6">
            <button
              type="submit"
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
