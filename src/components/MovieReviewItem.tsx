import type ReviewModel from "../domain/model/ReviewModel";

const MoviewReviewItem: React.FC<
  React.PropsWithChildren<{ movie: ReviewModel }>
> = (props) => {
  return (
    <div className="mb-4 rounded-md border-1 border-solid border-gray-300 p-4">
      <div className="mb-2 flex items-center">
        <span className="h-[30px] w-[30px] rounded-[15px] bg-gray-900" />
        <div className="mx-2">
          <p>{props.movie.userName}</p>
          <p className="text-xs text-gray-500">2024-09-14</p>
        </div>
      </div>
      <p className="text-sm text-gray-500">{props.movie.review}</p>
    </div>
  );
};

export default MoviewReviewItem;
