import {schoolOpts} from "./types";

const getBgClass = (school: schoolOpts) => ({
    pomona: "bg-pomona",
    hmc: "bg-hmc",
    cmc: "bg-cmc",
    pitzer: "bg-pitzer",
    scripps: "bg-scripps",
    all: "bg-tsl",
}[school]);

export default getBgClass;