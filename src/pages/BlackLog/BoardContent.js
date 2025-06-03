import TaskItem from './TaskItem';

function BoardContent() {
  return (
    
      <section className="space-y-2">
        <div className="flex items-center space-x-2 text-xl text-gray-600 font-semibold select-text cursor-pointer">
            <button aria-label="Toggle NHOM4 Sprint 1" class="flex items-center">
              <svg
                class="w-4 h-4 mr-1 text-gray-600"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                viewBox="0 0 24 24"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          <span>NHOM4 Sprint</span>
          <span className="font-bold">1</span>
          <span>12 Feb – 12 Feb (3 work items)</span>
        </div>
                  <div class="flex items-center space-x-1 text-lg text-gray-600 select-none">
            <button
              class="rounded-full bg-orange-500 text-white text-lg font-semibold w-7 h-7 flex items-center justify-center"
              aria-label="H"
            >
              H
            </button>
            <button
              class="rounded-full bg-orange-400 text-white text-lg font-semibold w-7 h-7 flex items-center justify-center"
              aria-label="D"
            >
              D
            </button>
            <button
              class="rounded-full bg-sky-400 text-white text-lg font-semibold w-7 h-7 flex items-center justify-center"
              aria-label="LD"
            >
              LD
            </button>
          </div>
        <div className="border border-gray-200 rounded text-xl text-gray-700">
          <TaskItem id="NHOM4-1" description="Thiết kế giao diện bằng Figma" assignee="H" status="TO DO" />
          <TaskItem id="NHOM4-3" description="Thiết kế DataBase" assignee="D" status="TO DO" score="1,158" />
          <TaskItem id="NHOM4-2" description="Chọn kiến trúc cho dự án" assignee="LD" status="TO DO" />
        </div>
      </section>
    
  );
}

export default BoardContent;