// This function will take in an array of File objects and convert them to base64 strings (for LLM compatibility)
export const base64 = async (fileList: File[]): Promise<string[]> => {
  const files: string[] = [];
  for await (const file of fileList) {
    const promise = new Promise<string | undefined>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result?.toString());
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    await promise.then((data: string | undefined) => {
      if (data) {
        files.push(data);
      }
    });
  };
  return files;
};