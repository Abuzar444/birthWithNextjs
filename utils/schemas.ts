import * as z from "zod";
import { ZodSchema } from "zod";

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  age: z.coerce.number().int().min(0, {
    message: "Age must be an number",
  }),
});

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  return result.data;
}

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string(),
});

export const imageSchema = z.object({
  image: validateFile(),
});

function validateFile() {
  const maxUpload = 1024 * 1024;
  const acceptedFile = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUpload;
    }, `File must be less then 1 MB`)
    .refine((file) => {
      return !file || acceptedFile.some((type) => file.type.startsWith(type));
    }, `File must be an image`);
}
