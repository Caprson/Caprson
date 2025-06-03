  import UserCircle from "./UserCircle";
  function UserCircles() {
      return (
        <div className="flex -space-x-2">
          <UserCircle initials="H" color="bg-orange-500" title="H" />
          <UserCircle
            initials="H"
            color="bg-orange-400"
            title="H"
            className="relative top-1"
          />
          <UserCircle initials="D" color="bg-orange-500" title="D" />
          <UserCircle initials="LD" color="bg-cyan-700" title="LD" />
        </div>
      );
    }
    export default UserCircles