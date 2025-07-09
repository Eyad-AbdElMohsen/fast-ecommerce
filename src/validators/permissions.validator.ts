import { registerDecorator } from 'class-validator';
import { permissions } from 'src/types/security-group-permissions.type.ts';

function validPermissions(value: string[]): boolean {
  return value.every((val) =>
    Object.values(permissions).find((permissionsVal) =>
      permissionsVal.includes(val),
    ),
  );
}

export function ValidPermissions() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'ValidPermissions',
      target: object.constructor,
      propertyName,
      options: { message: 'Invalid permission name' },
      validator: {
        validate(value: string[]) {
          return validPermissions(value);
        },
      },
    });
  };
}
