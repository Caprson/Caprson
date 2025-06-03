function UserCircle({ initials, color, title, className = "" }) {
      return (
        <div
          className={`${color} w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold text-white select-none ${className}`}
          title={title}
        >
          {initials}
        </div>
      );
    }
    export default UserCircle;