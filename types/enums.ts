export enum RolesEnum {
  None = 0,
  Manager = 2,
  Teacher = 3,
  Student = 5,
}

export const getRoleName = (roleId: number): string => {
  switch (roleId) {
    case RolesEnum.None:
      return "roles.none";
    case RolesEnum.Manager:
      return "roles.manager";
    case RolesEnum.Teacher:
      return "roles.teacher";
    case RolesEnum.Student:
      return "roles.student";
    default:
      return "Unknown Role";
  }
};
export enum GenderEnum {
  Female = 0,
  Male = 1,
}
export const getGenderLabel = (gender: number): string => {
  switch (gender) {
    case GenderEnum.Female:
      return "gender.female";
    case GenderEnum.Male:
      return "gender.male";
    default:
      return "gender.notSpecified";
  }
};
