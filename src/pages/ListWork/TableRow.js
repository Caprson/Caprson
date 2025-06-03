  import Assignee from "./Assignee";
  function TableRow({ row }) {
      return (
        <tr className="border-b border-gray-200">
          <td className="border border-gray-200 px-4 py-2 text-center w-16">
            {row.type === "bug" ? (
              <TypeIcon type="bug" />
            ) : (
              <input
                type="checkbox"
                checked={row.done}
                readOnly
                className="cursor-pointer"
                aria-label={`Mark ${row.key} done`}
              />
            )}
          </td>
          <td className="border border-gray-200 px-4 py-2 w-28">{row.key}</td>
          <td className="border border-gray-200 px-4 py-2 min-w-[300px]">{row.summary}</td>
          <td className="border border-gray-200 px-4 py-2 w-24">
            <span className="inline-block bg-gray-400 text-white text-xl font-semibold px-2 py-0.5 rounded select-none">
              {row.status}
            </span>
          </td>
          <td className="border border-gray-200 px-4 py-2 text-gray-400 flex items-center gap-2 cursor-pointer select-none w-40">
            <i className="far fa-comment-alt"></i> Add comment
          </td>
          <td className="border border-gray-200 px-4 py-2 w-36">
            <input
              type="text"
              readOnly
              value={row.sprint}
              className="border border-gray-300 rounded px-2 py-1 text-xl w-full cursor-default bg-white"
            />
          </td>
          <td className="border border-gray-200 px-4 py-2 w-48">
            <Assignee assignee={row.assignee} />
          </td>
          <td className="border border-gray-200 px-4 py-2 w-28">h</td>
          <td className="border border-gray-200 px-4 py-2 w-28">{row.created}</td>
          <td className="border border-gray-200 px-4 py-2 w-28">{row.updated}</td>
          <td className="border border-gray-200 px-4 py-2 w-48"><Assignee assignee={row.reporter} /></td>
          
        </tr>
      );
    }
export default TableRow
    function TypeIcon({ type }) {
      if (type === "bug") {
        return <i className="fas fa-bug text-red-600" title="Bug"></i>;
      }
      if (type === "done") {
        return null; // checkbox handled separately
      }
      return null;
    }