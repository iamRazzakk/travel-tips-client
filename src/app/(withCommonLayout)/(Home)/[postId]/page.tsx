import nexiosInstance from "@/src/config/nexios.config";

const page = async ({ params }: { params: { postId: string } }) => {
  const res = await nexiosInstance.get(
    `http://localhost:5001/api/v1/post/${params.postId}`,
    {
      cache: "no-store",
      next: {},
    }
  );
  console.log(res.data.data);
  return <div>This is my page component</div>;
};

export default page;
