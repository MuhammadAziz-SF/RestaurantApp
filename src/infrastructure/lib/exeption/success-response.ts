export const successRes = (
  data: string,
  statusCode: number = 200,
  message: string = "success",
) => {
  return {
    data,
    statusCode,
    message,
  };
};
