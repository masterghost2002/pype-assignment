import * as z from 'zod';
import { signInFormSchema, signUpFormSchema } from "./form-schema";
export type SignUpFormType = z.infer<typeof signUpFormSchema>;
export type SignUpFormProps = {
    onSubmit:(values:SignUpFormType)=>Promise<void>,
    isLoading:boolean
}
export type SignInFormType = z.infer<typeof signInFormSchema>;
export type SignInFormProps = {
    onSubmit:(values:SignInFormType)=>Promise<void>,
    isLoading:boolean
}