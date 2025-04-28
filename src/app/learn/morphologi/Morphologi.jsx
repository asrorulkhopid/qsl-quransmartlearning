import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Label from "../../../component/label/Label";
import { useQuery } from "@tanstack/react-query";
import { fetchMorphologi } from "../../../api/endpoint";
import Error from "../../../component/error/Error";
import Loading from "../../../component/loading/Loading";

const Morphologi = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data } = useQuery({
    queryFn: fetchMorphologi,
    queryKey: ["morph", id],
    staleTime: Infinity,
  });

  if (isLoading) return <Loading />;
  if (isError)
    return <Error message={"Something went wrong, Please try again!"} />;

  return (
    <div className="px-4 md:px-16 lg:px-44 h-full text-on-secondary overflow-y-scroll no-scrollbar">
      <div className="my-4 flex flex-col items-center">
        <div>
          <Label title={`Morphologi - ${data.title}`} />
        </div>
        <div className="mt-4 max-w-4xl w-full">
          <iframe
            className="w-full aspect-video rounded-md"
            src={data.video_url}
            title={`Morphologi ${data.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowFullScreen
          />
        </div>
        <div className=" mt-2">
          <p
            className="text text-on-secondary"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>
        <div className="flex justify-end mt-4 mr-16 w-full">
          <button
            onClick={() => navigate("exam")}
            className="bg-accent px-4 py-2 text-surface rounded-md shadow-xs hover:shadow-md hover:font-semibold shadow-accent cursor-pointer">
            Mark as Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default Morphologi;
