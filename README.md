# TSL 5C COVID Tracker

[*The Student Life*'s](https://tsl.news/) 5C COVID dashboard, accessible at [covid.tsl.news](https://covid.tsl.news/), aggregates COVID testing data from each of the 5C schools and displays them in one easy-to-read dashboard.

The dashboard first launched on September 19, 2021, developed by TSL News Staff Writer [Samson Zhang](https://www.samsonzhang.com) (PO '25) and maintained by TSL staff.

Data displayed on the dashboard is manually updated every Sunday at 8 PM for the previous week starting on Monday. Data is sourced from reports published by each of the 5C schools. The specifics for each school are detailed at [https://covid.tsl.news/about](https://covid.tsl.news/about).

## Development

1. Clone the repository
2. Run `npm i` in the root directory
3. Run `npm run dev`

## Updating data

Modify `/data/data.json` by adding objects with the following format to the array:

```json
{
    "school": "cmc",
    "weekStart": "2021-09-13",
    "studentsTested": 1343,
    "studentsPositive": 0,
    "employeesTested": 124,
    "employeesPositive": 0,
    "reported": "2021-09-17"
}
```

School codes are `cmc`, `hmc`, `pitzer`, `pomona`, and `scripps`.

Make sure all `weekStart` dates are Mondays.