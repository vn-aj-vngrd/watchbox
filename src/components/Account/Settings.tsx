// components/Profile.tsx

import { ExclamationCircleIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import sha1 from "crypto-js/sha1";
import { useSession } from "next-auth/react";
import Image from "next/image";
import router from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { v4 as uuidv4 } from "uuid";
import { env } from "../../env/client.mjs";
import { trpc } from "../../utils/trpc";
import Spinner from "../Common/Spinner";
import Deactivate from "./Deactivate";

type Inputs = {
  username: string;
  name: string;
};

const Settings = () => {
  const { mutate: updateUser, isLoading: isUpdating } = trpc.useMutation(["user.updateUser"], {
    onSuccess: () => {
      setIsloading(false);
      document.dispatchEvent(new Event("visibilitychange"));
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: deleteUser, isLoading: isDeleting } = trpc.useMutation(["user.deleteUser"], {
    onSuccess: () => {
      document.dispatchEvent(new Event("visibilitychange"));
      router.push("/auth/signin");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { data: session } = useSession();
  const [image, setImage] = useState<ImageListType>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);

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
    setImage([]);
  }, [reset, session]);

  const onChange = (imageList: ImageListType) => {
    setImage([]);
    setImage(imageList);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsloading(true);
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
      `eager=${eager}&public_id=${public_id}&timestamp=${timestamp}${env.NEXT_PUBLIC_CLOUDINARY_SECRET}`,
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
      },
    ).then((res) => res.json());

    const { secure_url } = req;

    updateUser({
      username,
      name,
      url: secure_url,
    });
  };

  const handleRemove = async () => {
    deleteUser();
  };

  if (isUpdating || isDeleting) {
    return <Spinner isGlobal={true} />;
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="mx-auto w-full space-y-8 md:max-w-lg">
        <div>
          <h2 className="mt-4 text-center text-3xl font-semibold text-gray-900 dark:text-white">
            Account Settings
          </h2>
        </div>

        <div className="rounded-lg border border-gray-100 bg-white px-4 py-8 dark:border-transparent dark:bg-darkerColor sm:px-10">
          <div className="space-y-6">
            <div className="relative mx-auto h-32 w-32 rounded-full bg-gray-100 dark:bg-grayColor">
              {image.length === 0 && (
                <Image
                  className="absolute z-0 h-24 w-24 rounded-full"
                  src={session?.user?.image || ""}
                  alt={session?.user?.name || ""}
                  priority
                  layout="fill"
                />
              )}

              <ImageUploading
                value={image}
                onChange={(imageList: ImageListType) => onChange(imageList)}
                dataURLKey="data_url"
              >
                {({ imageList, onImageUpload }) => (
                  <>
                    {isLoading ? (
                      <div className="cursor absolute bottom-0 right-0 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white p-1.5 text-gray-700 hover:bg-gray-100 dark:border-transparent dark:bg-darkColor dark:hover:bg-grayColor">
                        <svg
                          aria-hidden="true"
                          className="h-5 w-5 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                    ) : (
                      <button
                        onClick={onImageUpload}
                        className="cursor absolute bottom-0 right-0 z-20 h-8 w-8 cursor-pointer rounded-full border border-gray-100 bg-white p-1.5 text-gray-700 hover:bg-gray-100 dark:border-transparent dark:bg-darkColor dark:hover:bg-grayColor"
                      >
                        <ArrowPathIcon className="text-black dark:text-white" />
                      </button>
                    )}

                    {imageList?.map((image, index) => (
                      <div key={index} className="absolute z-0 h-32 w-32 ">
                        <Image
                          src={image["data_url"]}
                          className="rounded-full"
                          priority
                          alt=""
                          layout="fill"
                        />
                      </div>
                    ))}
                  </>
                )}
              </ImageUploading>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Username
                </label>
                <div className="relative mt-2 rounded-md">
                  <input
                    type="text"
                    className="input"
                    {...register("username", {
                      required: {
                        value: true,
                        message: "* Username is required",
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9]{5,}$/,
                        message:
                          "Username must be at least 5 characters and contain only letters and numbers.",
                      },
                    })}
                  />
                  {errors.username && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                  )}
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
                <div className="relative mt-2 rounded-md">
                  <input
                    type="text"
                    className="input"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "* Name is required",
                      },
                      pattern: {
                        value: /^[a-zA-Z ]{4,}$/,
                        message:
                          "Name must be at least 4 characters long and contain only letters.",
                      },
                    })}
                  />
                  {errors.name && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                  )}
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
                <div className="relative mt-2 rounded-md">
                  <input
                    type="email"
                    autoComplete="email"
                    disabled
                    value={session?.user?.email || ""}
                    className="input"
                  />
                </div>
              </div>

              {/* Save */}
              <div>
                <button
                  type="submit"
                  disabled={
                    username_watch === session?.user?.username &&
                    name_watch === session?.user?.name &&
                    image.length === 0
                  }
                  className={
                    "mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white focus:outline-none disabled:opacity-60 enabled:hover:bg-blue-700"
                  }
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6">
            <Deactivate handleRemove={handleRemove} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
