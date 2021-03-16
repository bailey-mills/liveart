import * as yup from "yup";

export const userSchema = yup.object().shape({
    email: yup.string().email().required(), 
    password: yup.string().min(6).required

})