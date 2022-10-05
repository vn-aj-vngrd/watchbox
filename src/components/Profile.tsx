/* eslint-disable @next/next/no-img-element */
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ImageUploading, { ImageListType } from "react-images-uploading";
import sha1 from "crypto-js/sha1";
import { trpc } from "../utils/trpc";
import { env } from "../env/client.mjs";
import { v4 as uuidv4 } from "uuid";
import Spinner from "./Spinner";
import router from "next/router";
import Modal from "./Modal";

type Inputs = {
  username: string;
  name: string;
};

const Profile = () => {
  const { mutate: updateUser, isLoading: isUpdating } = trpc.useMutation(
    ["user.updateUser"],
    {
      onSuccess: () => {
        document.dispatchEvent(new Event("visibilitychange"));
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const { mutate: deleteUser, isLoading: isDeleting } = trpc.useMutation(
    ["user.deleteUser"],
    {
      onSuccess: () => {
        document.dispatchEvent(new Event("visibilitychange"));
        router.push("/auth/signin");
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const { data: session } = useSession();
  const [image, setImage] = useState<ImageListType>([]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const username_watch = watch("username");
  const name_watch = watch("name");

  useEffect(() => {
    reset({
      username: session?.user?.username || " ",
      name: session?.user?.name || " ",
    });
  }, [reset, session]);

  const onChange = (imageList: ImageListType) => {
    setImage([]);
    setImage(imageList);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { username } = data;
    const { name } = data;

    if (!image[0]?.file) {
      updateUser({
        username,
        name,
        url: session?.user?.image || "",
      });
      return;
    }

    const formData = new FormData();
    const public_id = uuidv4().toString();
    const eager = "w_400,h_300,c_pad|w_260,h_200,c_crop";
    const timestamp = Math.round(new Date().getTime() / 1000).toString();
    const signature = sha1(
      `eager=${eager}&public_id=${public_id}&timestamp=${timestamp}${env.NEXT_PUBLIC_CLOUDINARY_SECRET}`
    ).toString();

    formData.append("file", image[0]?.file);
    formData.append("api_key", env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    formData.append("eager", eager);
    formData.append("public_id", public_id);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);

    const req = await fetch(
      `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    ).then((res) => res.json());

    const { secure_url } = req;
    console.log(req);

    updateUser({
      username,
      name,
      url: secure_url,
    });
  };

  const handleRemove: React.MouseEventHandler<HTMLButtonElement> = async () => {
    deleteUser();
  };

  if (isUpdating || isDeleting) {
    return <Spinner isGlobal={true} />;
  }

  return (
    <div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md py-12 space-y-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-4 text-3xl font-semibold text-center text-gray-900 dark:text-white">
            Account Profile
          </h2>
        </div>

        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10 dark:bg-darkerColor">
          <div className="space-y-6">
            <div className="mx-auto relative w-32 h-32 bg-gray-100 rounded-full dark:bg-gray-600">
              {image.length === 0 && (
                <Image
                  className="absolute z-0 w-24 h-24 rounded-full"
                  src={session?.user?.image || ""}
                  loader={({ src }) => `${src}?w=500&q=100`}
                  alt=""
                  priority
                  layout="fill"
                />
              )}

              <label
                htmlFor="preview"
                className="cursor absolute bottom-0 right-0 w-8 h-8 z-10 p-1.5 rounded-full bg-white border text-gray-700 shadow-sm dark:bg-grayColor dark:border-grayColor dark:text-white cursor-pointer"
              >
                <PencilSquareIcon />
              </label>
              <input id="preview" type="file" className="hidden" />

              <ImageUploading
                value={image}
                onChange={(imageList: ImageListType) => onChange(imageList)}
                dataURLKey="data_url"
              >
                {({ imageList, onImageUpload }) => (
                  <div className="upload__image-wrapper">
                    <button
                      onClick={onImageUpload}
                      className="cursor absolute bottom-0 right-0 w-8 h-8 z-20 p-1.5 rounded-full bg-white border text-gray-700 shadow-sm dark:bg-darkColor dark:border-grayColor dark:text-white cursor-pointer hover:bg-gray-200 dark:hover:bg-grayColor"
                    >
                      <PencilSquareIcon />
                    </button>

                    {imageList?.map((image, index) => (
                      <div key={index} className="image-item">
                        <Image
                          src={image["data_url"]}
                          className="absolute z-0 w-24 h-24 rounded-full"
                          priority
                          alt=""
                          layout="fill"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </ImageUploading>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Username */}
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
                        : "block w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:border-darkColor dark:bg-darkColor dark:focus:border-blue-500 dark:focus:ring-blue-400"
                    }
                    {...register("username", {
                      required: {
                        value: true,
                        message: "* Username is required",
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9]{5,}$/,
                        message:
                          "* Username must be at least 5 characters long and contain only letters and numbers.",
                      },
                    })}
                  />
                </div>
                <div className="my-3 text-sm text-red-500">
                  {errors.username && errors.username.message}
                </div>
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Name
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    className={
                      errors.name
                        ? "block w-full px-3 py-2 placeholder-red-400 border border-red-400 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-red-500 focus:border-blue-500 sm:text-sm"
                        : "block w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:border-darkColor dark:bg-darkColor dark:focus:border-blue-500 dark:focus:ring-blue-400"
                    }
                    {...register("name", {
                      required: {
                        value: true,
                        message: "* Name is requiredd",
                      },
                      pattern: {
                        value: /^[a-zA-Z ]{4,}$/,
                        message:
                          "* Name must be at least 4 characters long and contain only letters.",
                      },
                    })}
                  />
                </div>
                <div className="my-3 text-sm text-red-500">
                  {errors.name && errors.name.message}
                </div>
              </div>

              {/* Email */}
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
                    className="block w-full px-3 py-2 placeholder-gray-400 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:border-darkColor dark:bg-darkColor dark:focus:border-blue-500 dark:focus:ring-blue-400"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={
                    username_watch === session?.user?.username &&
                    name_watch === session?.user?.name &&
                    image.length === 0
                  }
                  className={
                    username_watch === session?.user?.username &&
                    name_watch === session?.user?.name &&
                    image.length === 0
                      ? "hidden"
                      : "flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
                  }
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6">
            <Modal handleRemove={() => handleRemove} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
