  import UserCircle from "./UserCircle";
  function UserCircles({ user,idSelelct, selectUser, update }) {
        const handleToggleUser = (userId) => {
        selectUser(
            (prev) =>
                prev.includes(userId)
                    ? prev.filter((id) => id !== userId) // Xoá nếu đã có
                    : [...prev, userId], // Thêm nếu chưa có
        );
        update(true);
    };
        function getInitials(name = '') {
        if (!name) return '';
        const words = name.trim().split(' ');
        if (words.length === 1) return words[0][0].toUpperCase();
        return words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
    }
      return (
        <div className="flex -space-x-2">
          {user.map((data,index)=>
          <UserCircle className={  idSelelct.includes(data.userId) ? 'border-2 border-blue-500' : ''} onClick={() => handleToggleUser(data.userId)} key={index} initials={getInitials(data.userName)} color="bg-orange-500" title={data.userName} />
          )}

        </div>
      );
    }
    export default UserCircles