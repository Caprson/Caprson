function UserCircle({ initials, color, title, className = "",onClick }) {
      return (
        <div
          className={`${color} w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white select-none ${className}`}
          title={title}
          onClick={onClick}
        >
          {initials}
        </div>
      );
    }
    export default UserCircle;