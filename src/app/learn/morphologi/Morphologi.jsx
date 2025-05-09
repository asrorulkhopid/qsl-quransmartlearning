import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMorphologi } from "../../../api/endpoint";
import Button from "../../../component/element/Button";
import MainTitle from "../../../component/element/MainTitle";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";

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
          <MainTitle>{data.title}</MainTitle>
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
          <Button onClick={() => navigate("exam")}>Mark as Done</Button>
        </div>
      </div>
    </div>
  );
};

export default Morphologi;
