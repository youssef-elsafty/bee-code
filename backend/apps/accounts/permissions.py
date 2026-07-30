from rest_framework.permissions import BasePermission

class IsSuperAdminOrAdmin(BasePermission):
    """
    Allows access only to superadmin or admin users.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role in ['superadmin', 'admin'])

class IsStaffOrAdmin(BasePermission):
    """
    Allows access to all internal staff roles.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)
