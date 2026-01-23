export const useCreateName = (name: string | undefined) => {
  return name ? name.trim().charAt(0).toUpperCase() : 'U';
};
