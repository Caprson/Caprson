function Filters()
{
    return(
        <div class="flex flex-wrap items-center gap-2 px-6 py-3 border-b border-gray-200 text-xl text-gray-700 select-none">
        <div class="flex items-center space-x-1">
          <input
            type="text"
            placeholder="Search b..."
            class="border border-solid border-gray-300 rounded px-5 py-2 text-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div class="flex items-center space-x-1">
          <button
            class="rounded-full bg-orange-500 text-white text-xl font-semibold w-8 h-8 flex items-center justify-center"
            aria-label="H"
          >
            H
          </button>
          <button
            class="rounded-full bg-orange-400 text-white text-xl font-semibold w-8 h-8 flex items-center justify-center"
            aria-label="D"
          >
            D
          </button>
          <button
            class="rounded-full bg-sky-400 text-white text-xl font-semibold w-8 h-8 flex items-center justify-center"
            aria-label="LD"
          >
            LD
          </button>
          <button
            class="rounded-full bg-gray-300 text-gray-600 text-xl font-semibold w-8 h-8 flex items-center justify-center"
            aria-label="User"
          >
            <i class="fas fa-user"></i>
          </button>
        </div>
        <select
          class="border border-gray-300 rounded px-5 py-2 text-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          aria-label="Version"
        >
          <option>Version</option>
        </select>
        <select
          class="border border-gray-300 rounded px-5 py-2 text-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          aria-label="Epic"
        >
          <option>Epic</option>
        </select>
        <select
          class="border border-gray-300 rounded px-5 py-2 text-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          aria-label="Type"
        >
          <option>Type</option>
        </select>
        <select
          class="border border-gray-300 rounded px-5 py-2 text-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          aria-label="Label"
        >
          <option>Label</option>
        </select>
        <select
          class="border border-gray-300 rounded px-5 py-2 text-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          aria-label="Quick filters"
        >
          <option>Quick filters</option>
        </select>
        <button
          aria-label="Chart"
          class="ml-auto p-1 rounded hover:bg-gray-100"
          title="Chart"
        >
          <svg
            class="w-8 h-8 text-gray-600"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M3 3v18h18" />
            <path d="M9 17V9" />
            <path d="M13 17V5" />
            <path d="M17 17v-3" />
          </svg>
        </button>
        <button
          aria-label="Columns"
          class="p-1 rounded hover:bg-gray-100"
          title="Columns"
        >
          <svg
            class="w-8 h-8 text-gray-600"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="4" width="7" height="16" rx="2" ry="2" />
            <rect x="14" y="4" width="7" height="16" rx="2" ry="2" />
          </svg>
        </button>
        <button
          aria-label="More options"
          class="p-1 rounded hover:bg-gray-100"
          title="More options"
        >
          <svg
            class="w-8 h-8 text-gray-600"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
    );
}
export default Filters