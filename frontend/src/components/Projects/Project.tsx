import Link from "next/link"
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons"
import { faExternalLink } from "@fortawesome/pro-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import { externalLinkProps } from "constants/links"
import { COLORS } from "constants/styles"

import { type ProjectAttributes } from "./ProjectList"

export type ProjectProps = ProjectAttributes & { idx: number }

const LABEL_LIMIT = 3

const Label = ({ labelName }: { labelName: keyof typeof COLORS }) => (
  <span
    className="self-center px-3 py-1 text-sm pointer-events-none rounded-xl"
    style={{
      backgroundColor: COLORS[labelName],
    }}
  >
    {labelName}
  </span>
)

const iconStyles =
  "leading-tight hover:text-slate-300 transition-colors duration-300" // Fortunately, the FA Anchor Tag inherits the line-height from its parent

export const Project: React.FC<ProjectProps> = ({
  imgSrc,
  title,
  description,
  labels,
  githubLink,
  deployedUrl,
  idx,
}) => {
  return (
    <div
      className={clsx(
        "relative flex p-4 rounded-lg shadow-md w-100 bg-slate-600 sm:max-w-[900px] overflow-hidden",
        "bg-gradient-to-t from-black/20",
        idx % 2 !== 0 ? "self-end" : ""
      )}
    >
      {/* TODO: Replace with responsive solution (Image component or Picture element) */}
      <img
        id="project-tile-img"
        src={imgSrc}
        className={clsx(
          "absolute inset-0 sm:relative max-w-[250px] self-center rounded-lg",
          "hidden sm:block sm:shadow-sm aspect-square object-cover object-center"
        )}
        alt={title}
      />
      <div
        id="project-bg-img"
        className={clsx(
          "w-full h-full absolute inset-0 opacity-10 z-0",
          "block sm:hidden bg-cover bg-center" // Hide the background image on screens >sm breakpoint
        )}
        style={{
          backgroundImage: `url(${imgSrc})`,
        }}
      />
      <div className="z-10 flex flex-col justify-between pl-2">
        <div className="px-2">
          <h3 className="pb-2 text-2xl tracking-wide text-center">{title}</h3>
          <p className="pb-2 text-sm text-neutral-100">{description}</p>
        </div>
        <div className="flex flex-col flex-wrap justify-center gap-3 px-2 pt-2 sm:justify-between sm:flex-row">
          <div className="flex flex-wrap justify-center gap-3">
            {labels.slice(0, LABEL_LIMIT).map((labelName) => (
              <Label key={labelName} labelName={labelName} />
            ))}
          </div>
          <div className="flex items-center justify-center gap-3">
            <Link
              href={githubLink}
              title="Source Code"
              className={iconStyles}
              {...externalLinkProps}
            >
              <FontAwesomeIcon icon={faGithubSquare} size="2x" />
            </Link>
            {deployedUrl && (
              <Link
                href={deployedUrl}
                title="Deployed Application"
                className={iconStyles}
                {...externalLinkProps}
              >
                <FontAwesomeIcon
                  icon={faExternalLink}
                  size="2x"
                  className="h-[28px]" // NOTE: Cheeky fix; this FA icon is 32px, others are 28px... 😅
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
