import {schoolOpts} from "./types";

const getSchoolName = (school: schoolOpts) => ({
    "pomona": "Pomona College",
    "hmc": "Harvey Mudd College",
    "pitzer": "Pitzer College",
    "cmc": "Claremont McKenna College",
    "scripps": "Scripps College",
}[school]);

export default getSchoolName;