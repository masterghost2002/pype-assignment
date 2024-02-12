import * as z from 'zod';
const signInFormSchema = z.object({
    email: z.string().email({message:'Email is required'}),
    password: z.string().min(8, { message: "Password must be 8 character long" }),
});
const signUpFormSchema = z.object({
    fullname:z.string().min(4, {message:"Full Name must be at least 4 characters"}).max(50, {message:"Full Name must not exceed 50 characters"}),
    email: z.string().email({message:'Email is required'}),
    password: z.string().min(8, { message: "Password must be 8 character long" }),
    confirmPassword: z.string().min(8, { message: "Password must be 8 character long" })
});
export {signInFormSchema, signUpFormSchema};