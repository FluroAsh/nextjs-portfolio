import clsx from "clsx"

export type ProjectProps = {
  imgSrc: string
  title: string
  description: string
  labels: string[]
  idx: number
}

export const Project: React.FC<ProjectProps> = ({
  imgSrc,
  title,
  description,
  labels,
  idx,
}) => {
  return (
    <div
      className={clsx(
        "flex p-4 rounded-lg shadow-md w-100 bg-slate-600 sm:max-w-[900px]",
        idx % 2 === 0 ? "" : "self-end"
      )}
    >
      <img src={imgSrc} className="max-h-[250px] rounded-lg self-center" />
      <div className="flex flex-col justify-between pl-2">
        <div className="px-2">
          <h3 className="mb-2 text-2xl tracking-wide">{title}</h3>
          <p className="text-neutral-100">{description}</p>
        </div>
        <div className="flex flex-wrap justify-between flex-1 px-2 pt-2">
          <div className="flex gap-3">
            {labels.slice(0, 3).map((labelName) => (
              <span>{labelName}</span>
            ))}
          </div>
          <div className="px-4 py-2 ml-3 bg-pink-300 rounded-sm">
            <span className="">GitHub</span>
          </div>
        </div>
      </div>
    </div>
  )
}
