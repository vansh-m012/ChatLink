// zod,yup etc validate your input-data against the schema
// syntax in step2 => https://react-hook-form.com/get-started#SchemaValidation
import {z} from "zod"

const createChatSchema = z.object ({

    title: z.string().min( 4, {message: "Title must be 4 character long"}).max(191, {message: "Title must be less than 191 char"}),
    passcode: z.string().min( 4, {message: "Passcode must be 4 character long"}).max( 30, {message: "Passcode must be less than 30 char"})

}).required()


// exporting our schema
export default createChatSchema

// exporting the type of our schema ( as we are working on typescript, therefore we may use this type in any future file)
export type createChatSchemaType= z.infer<typeof createChatSchema>