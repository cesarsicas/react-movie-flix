import movieTheater from "../../assets/poster_placeholder.png";

export function UserAvatar() {
  return (
    <div className="ml-2 h-[35px] w-[35px] rounded-[50%] border-[1px] border-gray-900 p-1">
      <img src={movieTheater} alt="" />
    </div>
  );
}
