import { registerEnumType } from '@nestjs/graphql';

export enum AdminPermissionsEnum {
  // for super admin
  CREATE_ADMIN = 'CREATE_ADMINS',
  DELETE_ADMIN = 'DELETE_ADMINS',
  UPDATE_ADMIN = 'UPDATE_ADMINS',
  ASSIGN_SECURITY_GROUP = 'ASSIGN_SECURITY_GROUPS',
  READ_PERMISSIONS = 'READ_PERMISSIONS',
  MANAGE_PERMISSIONS = 'MANAGE_PERMISSIONS',
}
registerEnumType(AdminPermissionsEnum, {
  name: 'AdminPermissionsEnum',
});

export enum UserPermissionsEnum {
  READ_USERS = 'READ_USERS',
  UPDATE_USERS = 'UPDATE_USERS',
  CREATE_USERS = 'CREATE_USERS',
  DELETE_USERS = 'DELETE_USERS',
  BAN_USERS = 'BAN_USERS',
  ACTIVATE_USERS = 'ACTIVATE_USERS',
}
registerEnumType(UserPermissionsEnum, { name: 'UserPermissionsEnum' });

export enum ProductPermissionsEnum {
  READ_PRODUCTS = 'READ_PRODUCTS',
  UPDATE_PRODUCTS = 'UPDATE_PRODUCTS',
  CREATE_PRODUCTS = 'CREATE_PRODUCTS',
  DELETE_PRODUCTS = 'DELETE_PRODUCTS',
}
registerEnumType(ProductPermissionsEnum, { name: 'ProductPermissionsEnum' });

export enum OrderPermissionsEnum {
  READ_ORDERS = 'READ_ORDERS',
  UPDATE_ORDERS = 'UPDATE_ORDERS',
  CREATE_ORDERS = 'CREATE_ORDERS',
  DELETE_ORDERS = 'DELETE_ORDERS',
  MANAGE_ORDER_STATUS = 'MANAGE_ORDER_STATUS',
}
registerEnumType(OrderPermissionsEnum, { name: 'OrderPermissionsEnum' });

export enum PaymentPermissionsEnum {
  READ_PAYMENTS = 'READ_PAYMENTS',
  CREATE_PAYMENTS = 'CREATE_PAYMENTS',
  REFUND_PAYMENTS = 'REFUND_PAYMENTS',
}
registerEnumType(PaymentPermissionsEnum, { name: 'PaymentPermissionsEnum' });

export enum ShipmentPermissionsEnum {
  READ_SHIPMENTS = 'READ_SHIPMENTS',
  CREATE_SHIPMENTS = 'CREATE_SHIPMENTS',
  UPDATE_SHIPMENTS = 'UPDATE_SHIPMENTS',
}
registerEnumType(ShipmentPermissionsEnum, { name: 'ShipmentPermissionsEnum' });

export enum ReviewPermissionsEnum {
  READ_REVIEWS = 'READ_REVIEWS',
  CREATE_REVIEWS = 'CREATE_REVIEWS',
  DELETE_REVIEWS = 'DELETE_REVIEWS',
  MODERATE_REVIEWS = 'MODERATE_REVIEWS',
}
registerEnumType(ReviewPermissionsEnum, { name: 'ReviewPermissionsEnum' });

export enum CategoryPermissionsEnum {
  READ_CATEGORIES = 'READ_CATEGORIES',
  CREATE_CATEGORIES = 'CREATE_CATEGORIES',
  UPDATE_CATEGORIES = 'UPDATE_CATEGORIES',
  DELETE_CATEGORIES = 'DELETE_CATEGORIES',
}
registerEnumType(CategoryPermissionsEnum, { name: 'CategoryPermissionsEnum' });

export const permissions = {
  users: Object.keys(UserPermissionsEnum),
  admins: Object.keys(AdminPermissionsEnum),
  products: Object.keys(ProductPermissionsEnum),
  orders: Object.keys(OrderPermissionsEnum),
  payments: Object.keys(PaymentPermissionsEnum),
  shipments: Object.keys(ShipmentPermissionsEnum),
  reviews: Object.keys(ReviewPermissionsEnum),
  categories: Object.keys(CategoryPermissionsEnum),
};

export type PermissionType =
  | keyof typeof AdminPermissionsEnum
  | keyof typeof UserPermissionsEnum
  | keyof typeof ProductPermissionsEnum
  | keyof typeof OrderPermissionsEnum
  | keyof typeof PaymentPermissionsEnum
  | keyof typeof ShipmentPermissionsEnum
  | keyof typeof ReviewPermissionsEnum
  | keyof typeof CategoryPermissionsEnum;

export function getAllPermissions(): string[] {
  return Object.values(permissions).reduce((total, row) => {
    total.push(...row);
    return total;
  }, [] as string[]);
}
