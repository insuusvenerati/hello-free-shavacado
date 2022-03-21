import { useRouter } from "next/router";

export default function Recipe() {
  const router = useRouter();
  const { recipe } = router.query;

  return <div>{JSON.stringify(recipe, null, 2)}</div>;
}
