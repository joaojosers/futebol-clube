// import * as joi from 'joi';

// const validateUsername: joi.StringSchema = joi.string().required();
// const validatePassword: joi.StringSchema = joi.string().required();
// const messageError = '"username" and "password" are required';

// type PostUser = {
//   username: string;
//   password: string;
//   id: number;
//   vocation: string;
//   level: number;
// };
// type PostProductName = {
//   name: string;
// };
// // type PostProductPrice = {
// //   price: string;
// // };
// const validatePostUser: joi.ObjectSchema<PostUser> = joi.object({
//   username: validateUsername,
//   password: validatePassword,
//   id: joi.number().required(),
//   vocation: joi.string().required(),
//   level: joi.number().required(),
// }).messages({
//   'any.required': messageError,
// });

// const validateInputFields: joi.ObjectSchema<PostProductName> = joi.object({
//   name: joi.string().min(3).required(),
//   price: joi.string().min(3).required(),
//   orderId: joi.number().required(),
// });

// export {
//   validatePostUser,
//   validateInputFields,
// };

// .messages({
//   'any.required': '"name" is required',
//   'string.empty': '"name" must be a string',
//   'string.min': '"name" length must be at least 3 characters long',
// });

// const validateInputPrice: joi.ObjectSchema<PostProductPrice> = joi.object({
//   price: joi.string().min(3).required(),
// }).messages({
//   'any.required': '"price" is required',
//   'string.empty': '"price" must be a string',
//   'string.min': '"price" length must be at least 3 characters long',
// });
