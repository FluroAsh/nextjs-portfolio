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
}) => (
  <div
    className={clsx(
      "relative flex rounded-lg shadow-md w-100 bg-gradient-to-tr to-slate-500 from-slate-600 md:max-w-[900px] overflow-hidden",
      idx % 2 !== 0 ? "self-end" : ""
    )}
    tabIndex={0}
  >
    <div
      id="project-tile-img"
      className="min-w-[40%] bg-cover bg-center opacity-75 hidden md:block"
      aria-label={title}
      style={{
        backgroundImage: `url(${imgSrc})`,
      }}
    />
    <div
      id="project-bg-img"
      className={clsx(
        "w-full h-full absolute inset-0 opacity-10",
        "block md:hidden bg-cover bg-center" // Hide the background image on screens >sm breakpoint
      )}
      style={{
        backgroundImage: `url(${imgSrc})`,
      }}
    />

    <div className="z-10 flex flex-col justify-between p-5 text-center md:text-start">
      <h3 className="pb-2 text-2xl tracking-wide text-center">{title}</h3>
      <div className="pb-4 text-sm leading-normal text-neutral-100">
        {description}
      </div>
      <div className="flex flex-col flex-wrap justify-center gap-3 md:flex-row">
        <div className="flex flex-wrap justify-center gap-3 md:flex-1">
          {labels.slice(0, LABEL_LIMIT).map((labelName) => (
            <Label key={labelName} labelName={labelName} />
          ))}
        </div>
        <div className="flex items-center justify-center gap-3 pt-1 md:pt-0">
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
    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20" />
  </div>
)
