export type ServerErrorHandlerType = {
  message: string;
};

export const serverErrorHandler = async (error: any, funcName: string) => {
  if (error instanceof Error) {
    console.error(`(${funcName}): ${error.message}`);
    return { message: `(${funcName}): ${error.message}` };
  } else {
    console.error(`(${funcName}): ${error.message}`);
    return { message: `(${funcName}): ${error.message}` };
  }
};
