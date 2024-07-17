export const sizeInMB = (
  sizeInBytes: number,
  decimalsNum: number = 2
): number => {
  if (sizeInBytes < 0) {
    throw new Error("Size in bytes cannot be negative");
  }

  const BYTES_IN_MB = 1024 * 1024;

  const result = sizeInBytes / BYTES_IN_MB;
  // return +result.toFixed(decimalsNum);
  return parseFloat(result.toFixed(decimalsNum));
};

//thanks to Alaa Mohammad @alaa-m1
//https://github.com/colinhacks/zod/issues/387#issuecomment-1919182950
