import UserCircle from "./UserCircle";
function Assignee({ assignee }) {
      if (!assignee) return null;
      return (
        <div className="flex items-center gap-2">
          <UserCircle
            initials={assignee.initials}
            color={assignee.color}
            title={assignee.name}
          />
          <span className="truncate">{assignee.name}</span>
        </div>
      );
    }
    export default Assignee;