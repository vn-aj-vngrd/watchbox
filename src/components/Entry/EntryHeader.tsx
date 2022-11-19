import React from "react";
import { FavoriteBox } from "@prisma/client";
import { trpc } from "../../utils/trpc";
import { server } from "../../config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type Props = {
  box:
    | {
        id: string;
        username: string | null;
        boxes: { id: string; created_at: Date; updated_at: Date; boxTitle: string }[];
      }
    | null
    | undefined;
  favoriteBox: FavoriteBox | null | undefined;
  id: string;
  refetch: () => void;
};

type Inputs = {
  status: string;
};

const EntryHeader = ({ box, favoriteBox, id, refetch }: Props) => {
  return <div className="flex h-12 items-center border-b pl-4 pr-2"></div>;
};

export default EntryHeader;
