export const isArray = (text: string | string[]): text is string[] => {
  return (text as string[]) !== undefined;
};
