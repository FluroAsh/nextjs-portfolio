import { COLOR_PROPERTIES, type ColorName } from "constants/styles"

import { cn } from "lib/utils"

const Label = ({
  labelName,
  className: extraStyles,
}: {
  labelName: ColorName
  className?: string
}) => (
  <span
    className={cn(
      "px-2 py-[3px] text-md md:text-[0.78rem] font-semibold tracking-wide border-2",
      extraStyles
    )}
    style={{
      backgroundColor: COLOR_PROPERTIES[labelName].fill,
      color: COLOR_PROPERTIES[labelName].text,
      borderColor: COLOR_PROPERTIES[labelName].borderColor,
    }}
  >
    {labelName}
  </span>
)

export default Label
