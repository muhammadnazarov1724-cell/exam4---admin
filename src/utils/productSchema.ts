import { z } from 'zod'

export const productSchema = z.object({
    id: z.number(),
    productName: z.string(),
    image: z.string().nullish(),
    quantity: z.number(),
    categoryName: z.string().nullish(),
    price: z.number(),
    hasDiscount: z.boolean(),
    discountPrice: z.number(),
})

export const productsResponseSchema = z.object({
    statusCode: z.literal(200),
    pageNumber: z.number(),
    pageSize: z.number(),
    totalPage: z.number(),
    totalRecord: z.number(),
    data: z.object({
        products: z.array(productSchema),
    }),
})

export type Product = z.infer<typeof productSchema>
export type ProductsResponse = z.infer<typeof productsResponseSchema>

// Правила заполнения формы добавления.
export const addProductSchema = z.object({
    ProductName: z.string().trim()
        .min(1, 'Введите название товара')
        .max(100, 'Название не должно превышать 100 символов'),

    Code: z.string().trim().min(1, 'Введите код товара'),

    Description: z.string().trim()
        .min(1, 'Введите описание')
        .max(500, 'Описание не должно превышать 500 символов'),

    Price: z.number({ error: 'Введите цену' })
        .min(0, 'Цена не может быть отрицательной'),

    Quantity: z.number({ error: 'Введите количество' })
        .int('Количество должно быть целым')
        .min(0, 'Количество не может быть отрицательным'),

    HasDiscount: z.boolean(),

    DiscountPrice: z.number({ error: 'Введите цену со скидкой' })
        .min(0, 'Цена не может быть отрицательной'),

    Size: z.string(),
    Weight: z.string(),
}).refine(
    (values) => (
        !values.HasDiscount ||
        values.DiscountPrice < values.Price
    ),
    {
        path: ['DiscountPrice'],
        message: 'Цена со скидкой должна быть ниже обычной',
    }
)

export type AddProductValues = z.infer<typeof addProductSchema>