export type schoolOpts = "hmc" | "pitzer" | "scripps" | "pomona" | "cmc";

export interface DataItem {
    school: schoolOpts,
    weekStart: string,
    studentsTested: number,
    studentsPositive: number,
    employeesTested: number,
    employeesPositive: number,
    reported: string,
}

export interface CaseItem {
    isEmployee?: boolean;
    isNoReport?: boolean,
    school: schoolOpts;
}