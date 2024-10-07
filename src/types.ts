export interface DayData {
  fullName?: string;
  address?: string;
  contractNumber?: string;
  shifts?: number[];
  contractor?: string;
  jobType?: string;
  transport?: string;
  fuelCost?: string;
  noHoursToday?: boolean;
}

export interface Timesheet {
  days: {
    [key: string]: DayData;
  };
}