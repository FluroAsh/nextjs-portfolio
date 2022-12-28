type ERROR_MAP = { [key: string]: string }

export const ERROR_MAP: ERROR_MAP = {
  400: 'Unexpected error, please try again',
  500: 'Please try again later'
} as const
