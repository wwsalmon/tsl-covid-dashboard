import {schoolOpts} from "./types";

const getSchoolShortName = (school: schoolOpts) => ({
    "pomona": "Pomona",
    "hmc": "HMC",
    "pitzer": "Pitzer",
    "cmc": "CMC",
    "scripps": "Scripps",
}[school]);

export default getSchoolShortName;