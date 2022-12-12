// components/Settings.tsx

import { ArrowPathIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
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
  const updateUser = trpc.useMutation(["user.updateUser"], {
    onSuccess: () => {
      setIsloading(false);
      document.dispatchEvent(new Event("visibilitychange"));
    },
    onError: (err) => {
      setIsloading(false);
      console.log(err);
    },
  });

  const deleteUser = trpc.useMutation(["user.deleteUser"], {
    onSuccess: () => {
      document.dispatchEvent(new Event("visibilitychange"));
      router.push("/auth/signin");
    },
    onError: (err) => {
      setIsloading(false);
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
      updateUser.mutateAsync({
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

    updateUser.mutateAsync({
      username,
      name,
      url: secure_url,
    });
  };

  const handleRemove = async () => {
    deleteUser.mutateAsync();
  };

  if (deleteUser.isLoading) {
    return <Spinner isGlobal={true} />;
  }

  return (
    <div className="flex h-full items-center justify-center py-6">
      <div className="mx-auto w-full space-y-8 md:max-w-lg">
        <div>
          <h2 className="text-center text-2xl font-semibold text-gray-900 dark:text-white md:text-3xl">
            Account Settings
          </h2>
        </div>

        <div className="rounded-lg border border-gray-100 bg-white px-4 py-8 dark:border-transparent dark:bg-darkerColor sm:px-10">
          <div className="space-y-6">
            <div className="relative mx-auto h-32 w-32 rounded-full bg-gray-100 dark:bg-grayColor">
              {image.length === 0 && session?.user?.image && (
                <Image
                  draggable={false}
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
                    <button
                      onClick={onImageUpload}
                      className="cursor absolute bottom-0 right-0 z-20 h-8 w-8 cursor-pointer rounded-full border border-gray-100 bg-white p-1.5 text-gray-700 hover:bg-gray-100 dark:border-transparent dark:bg-darkColor dark:hover:bg-grayColor"
                    >
                      <ArrowPathIcon className="text-black dark:text-white" />
                    </button>

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
                        message: "Username is required",
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
                <div className="my-3 text-sm text-red-500">
                  {updateUser.error && updateUser.error.message}
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
                        message: "Name is required",
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
                    value={session?.user?.email || ""}
                    className="input"
                    disabled
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
                  {updateUser.isLoading || isLoading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <Spinner isSmall={true} />

                      <p>Saving Changes</p>
                    </div>
                  ) : (
                    <> Save Changes</>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-4">
            <Deactivate handleRemove={handleRemove} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
