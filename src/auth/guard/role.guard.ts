import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AllowedRoles } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.get(AllowedRoles, context.getHandler());
    if (!allowedRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return allowedRoles.includes(user.role);
  }
}
