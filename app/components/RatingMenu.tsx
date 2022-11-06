import { useRatingMenu } from "~/hooks/useRatingMenu";

export const RatingMenu = () => {
  const { items, refine } = useRatingMenu({
    attribute: "rating",
  });

  return (
    <div className="rating grid justify-start gap-2">
      Rating
      <div className="inline-flex">
        {items.map((item) => (
          <input
            key={item.value}
            type="radio"
            name="rating"
            onClick={() => refine(item.value)}
            className="mask mask-star bg-orange-400"
          />
        ))}
      </div>
    </div>
  );
};
