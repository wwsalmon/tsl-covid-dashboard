export type schoolOpts = "hmc" | "pitzer" | "scripps" | "pomona" | "cmc";

export interface DataItem {
    school: schoolOpts,
    weekStart: string,
    studentsTested: number,
    studentsPositive: number,
    employeesTested: number,
    employeesPositive: number,
}

export interface CaseItem {
    isEmployee: boolean;
    school: schoolOpts;
}