
export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface Image {
    id: number;
    imageUrl: string;
    imageAltText: string;
    isPrimary: boolean;
    order: number;
}

export type ProductAttributeValue = {
    id: number;
    value: string;
    images?: Image[];
}

export type ProductAttribute = {
    id: number;
    name: string;
    type: 'text' | 'image';
    values: ProductAttributeValue[];
}

export type Sku = {
    id: number;
    sku: string;
    quantity: number;
    price: string | number;
    attributeValues: ProductAttributeValue[];
}

export type PaginationProps<T> = {
    data: Array<T>
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    price: string;
    quantity: number;
    hasVariations: boolean;
    images: Image[];
    descriptionHtml: string;
    metaDescription: string;
    metaTitle: string;
    status: 'active' | 'inactive';
    createdAt: string;
    category: {
        id: number;
        name: string;
        slug: string;
    };
    department: {
        id: number;
        name: string;
        slug: string;
    };
    attributes: ProductAttribute[];
    skus: Sku[];
}

export interface Cart {
    cartId: number;
    items: CartItem[];
    itemCount: number;
    subtotal: number;
}

export type ProductQuery = ApiResponse<Product>;

export type CartQuery = ApiResponse<Cart>;

export interface Section {
    id: number;
    title: string;
    slug: string;
    layout: string;
    type: string;
    sort_order: number;
    products: Product[];
}

export type CartItem = {
    id: number;
    product_id: number;
    title: string;
    slug: string;
    price: number;
    quantity: number;
    image: string;
    product_sku_id: number | null;
    options: ProductAttributeValue[];
}

export type GroupedCartItem = {
    user: User;
    items: CartItem[];
    totalPrice: number;
    totalQuantity: number;
}

export type OrderItem = {
    id: number;
    quantity: number;
    price: number;
    variation_type_option_ids: number[];
    product: {
        id: number;
        title: string;
        slug: string;
        description: string;
        image: string;
    };
}

export type Order = {
    id: number;
    total_price: number;
    status: string;
    created_at: string;
    vendorUser: {
        id: number;
        name: string;
        email: string;
        store_name: string;
        store_address: string;
    };
    orderItems: OrderItem[]
}

export type SharedData<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    csrf_token: string;
    error: string;
    success: {
        message: string;
        time: number;
    };
    totalQuantity: number;
    totalPrice: number;
    miniCartItems: CartItem[];
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}