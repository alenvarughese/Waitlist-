export const formatResponse = (success: boolean, message: string, data?: any) => {
  return { success, message, ...(data && { data }) };
};
