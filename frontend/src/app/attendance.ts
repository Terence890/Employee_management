export interface Attendance {
    id: number;
    employeeId: number;
    date: string;
    timeIn: string;
    timeOut: string;
    present: boolean;
}
