
const UrlData = ({value, deleteUrl}) => {
    console.log(value)

    const { clicks, createdAt, originalUrl, shortCode, updatedAt } = value;

    const formattedCreatedAt = new Date(createdAt).toLocaleString();
    const formattedUpdatedAt = new Date(updatedAt).toLocaleString();

  return (
		<div className="w-full max-w-3xl rounded-2xl border mb-5 border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
			{/* Header */}
			<div className="mb-5 flex items-center justify-between gap-4">
				<div>
					<p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
						Short URL
					</p>

					<h2 className="mt-1 text-xl font-bold text-indigo-600 dark:text-indigo-400">
						/{shortCode}
					</h2>
				</div>

				{/* Clicks */}
				<div className="rounded-xl bg-indigo-50 px-4 py-2 text-center dark:bg-indigo-950/40">
					<p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
						Clicks
					</p>

					<p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
						{clicks}
					</p>
				</div>
			</div>

			{/* Original URL */}
			<div className="mb-5">
				<p className="mb-2 text-sm font-medium text-zinc-600 dark:text-zinc-300">
					Original URL
				</p>

				<div className="rounded-xl bg-zinc-100 p-3 dark:bg-zinc-800">
					<p className="break-all text-sm text-zinc-700 dark:text-zinc-300 line-clamp-2">
						{originalUrl}
					</p>
				</div>
			</div>

			{/* Dates */}
			<div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">              
				<div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-700">
					<p className="text-xs text-zinc-500 dark:text-zinc-400">Created At</p>

					<p className="mt-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
						{formattedCreatedAt}
					</p>
				</div>

				<div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-700">
					<p className="text-xs text-zinc-500 dark:text-zinc-400">Updated At</p>

					<p className="mt-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
						{formattedUpdatedAt}
					</p>
				</div>
			</div>

			{/* Actions */}
			<div className="flex flex-col gap-3 sm:flex-row">
				<button
					onClick={() =>
						navigator.clipboard.writeText(
							`${window.location.origin}/${shortCode}`,
						)
					}
					className="flex-1 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
				>
					Copy Short URL
				</button>

				<a
					href={originalUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="flex-1 rounded-xl border border-zinc-300 px-4 py-3 text-center text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
				>
					Visit Original URL
				</a>
          </div>
          <div className="pt-3">
              <button className="px-4 py-2 w-full rounded-xl bg-blue-700 text-white font-bold" onClick={() => deleteUrl(value._id)}>Delete Url</button>
          </div>
		</div>
	);
}

export default UrlData